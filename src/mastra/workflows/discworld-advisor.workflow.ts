import { Step, Workflow } from '@mastra/core/workflows';
import { z } from 'zod';
import { characterSelectorTool } from '../tools/character-selector.tool';
import { discworldCharacterAgent } from '../agents/discworld-character.agent';
import { formatPromptForCharacter } from '../utils/formatPromptForCharacter';

// Step 1: Select Character
export const selectCharacterStep = new Step({
	id: 'select-character',
	description: 'Find the selected character style guide.',
	inputSchema: z.object({
		characterName: z.string(),
	}),
	outputSchema: z.object({
		name: z.string(),
		personality: z.string(),
		speakingStyle: z.string(),
		catchPhrases: z.array(z.string()),
		background: z.string(),
	}),
	execute: async ({ context, runtimeContext }) => { // <- Add runtimeContext here!
		const { characterName } = context.triggerData;
		
		if (!characterName) {
			throw new Error('characterName is required');
		}
		
		return await characterSelectorTool.execute!({
			context: { characterName },
			runtimeContext,
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
		personality: z.string(),
		speakingStyle: z.string(),
		catchPhrases: z.array(z.string()),
		background: z.string(),
		userQuestion: z.string(),
	}),
	execute: async ({ context }) => {
		const selectResult = context.getStepResult('select-character') as {
			characterName: string;
			speakingStyle: string
			personality: string;
			catchPhrases: string[];
			background: string;
		};
		const { userQuestion } = context.triggerData;
		
		if (!selectResult || !userQuestion) {
			throw new Error('Missing character selection or user question.');
		}
		
		return {
			...selectResult,
			userQuestion,
		};
	},
});

// Step 3: Generate reply
export const generateReplyStep = new Step({
	id: 'generate-reply',
	description: 'Generate a reply in the character\'s style.',
	
	inputSchema: z.object({
		name: z.string(),
		personality: z.string(),
		speakingStyle: z.string(),
		catchPhrases: z.array(z.string()),
		background: z.string(),
		userQuestion: z.string(),
	}),
	
	outputSchema: z.object({
		reply: z.string(),
	}),
	
	execute: async ({ context }) => {
		const { name, personality, speakingStyle, catchPhrases, background, userQuestion } = context.triggerData;
		const character = (context.steps['select-character'] as any).output;
		const formattedPrompt = formatPromptForCharacter(
			{ ...character },
			userQuestion
		);
		
		const response = await discworldCharacterAgent.stream([
			{
				role: 'user',
				content: formattedPrompt,
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
