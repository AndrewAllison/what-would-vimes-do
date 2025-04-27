import { Step, Workflow } from '@mastra/core/workflows';
import { z } from 'zod';
import { characterSelectorTool } from '../tools/character-selector.tool';
import { discworldCharacterAgent } from '../agents/discworld-character.agent';

// Step 1: Select Character
export const selectCharacterStep = new Step({
	id: 'select-character',
	description: 'Find the selected character style guide.',
	inputSchema: z.object({
		characterName: z.string(),
	}),
	outputSchema: z.object({
		name: z.string(),
		style: z.string(),
	}),
	execute: async ({ context, runtimeContext }) => { // <- Add runtimeContext here!
		console.log('Executing character selector tool with characterName:', context);
		
		const { characterName } = context.triggerData;
		
		if (!characterName) {
			throw new Error('characterName is required');
		}
		
		console.log('Executing character selector tool with characterName:', characterName);
		
		return await characterSelectorTool.execute!({
			context: { characterName },
			runtimeContext, // ← Now runtimeContext is available correctly
		});
	},
});

// Step 2: Prepare input for generating reply
export const prepareInputStep = new Step({
	id: 'prepare-input',
	description: 'Prepare input for generating a reply.',
	inputSchema: z.object({
		userQuestion: z.string(),
	}),
	outputSchema: z.object({
		characterName: z.string(),
		characterStyle: z.string(),
		userQuestion: z.string(),
	}),
	execute: async ({ context }) => {
		const selectResult = context.getStepResult('select-character') as { name: string; style: string };
		const { userQuestion } = context.triggerData;
		
		if (!selectResult || !userQuestion) {
			throw new Error('Missing character selection or user question.');
		}
		
		return {
			characterName: selectResult.name,
			characterStyle: selectResult.style,
			userQuestion,
		};
	},
});

// Step 3: Generate reply
export const generateReplyStep = new Step({
	id: 'generate-reply',
	description: 'Generate a reply in the character\'s style.',
	inputSchema: z.object({
		characterName: z.string(),
		characterStyle: z.string(),
		userQuestion: z.string(),
	}),
	outputSchema: z.object({
		reply: z.string(),
	}),
	execute: async ({ context }) => {
		const { characterName, characterStyle, userQuestion } = context.triggerData;
		
		const response = await discworldCharacterAgent.stream([
			{
				role: 'user',
				content: `
You are ${characterName} from Terry Pratchett's Discworld novels.

Your character style:
- ${characterStyle}

Stay fully in character when responding. Your tone must match ${characterName}.

Here is the user's question:
"${userQuestion}"

Reply as ${characterName} would naturally. Keep it in your own voice.
`.trim(),
			},
		]);
		
		let reply = '';
		
		for await (const chunk of response.textStream) {
			reply += chunk;
		}
		
		return { reply };
	},
});

// Workflow
export const discworldAdvisorWorkflow = new Workflow({
	name: 'discworld-advisor-workflow',
	triggerSchema: z.object({
		characterName: z.string(),
		userQuestion: z.string(),
	}),
})
	.step(selectCharacterStep)
	.then(prepareInputStep)
	.then(generateReplyStep);

discworldAdvisorWorkflow.commit();
