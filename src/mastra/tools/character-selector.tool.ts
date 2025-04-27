import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import characters from '../_data/characters.json';

export const characterSelectorTool = createTool({
	id: 'character-selector',
	description: 'Selects a Discworld character and returns their style description.',
	
	inputSchema: z.object({
		characterName: z.string().describe('The name of the Discworld character'),
	}),
	
	outputSchema: z.object({
		name: z.string(),
		personality: z.string(),
		speakingStyle: z.string(),
		catchPhrases: z.array(z.string()),
		background: z.string(),
	}),
	
	execute: async ({ context }) => {
		const characterName = context.characterName.toLowerCase();
		console.log('Using tool to fetch character style for', characterName);
		const character = characters.find(
			(c) => c.name.toLowerCase() === characterName
		);
		
		if (!character) {
			throw new Error(`Character "${context.characterName}" not found.`);
		}
		
		console.log('Using tool to fetch character style for', character);
		
		return {
			...character,
		};
	},
});
