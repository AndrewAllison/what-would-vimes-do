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
		style: z.string(),
	}),
	
	execute: async ({ context }) => {
		const characterName = context.characterName.toLowerCase();
		
		const character = characters.find(
			(c) => c.name.toLowerCase() === characterName
		);
		
		if (!character) {
			throw new Error(`Character "${context.characterName}" not found.`);
		}
		
		return {
			name: character.name,
			style: character.style,
		};
	},
});
