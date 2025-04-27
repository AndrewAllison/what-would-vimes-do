import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';

export const discworldCharacterAgent = new Agent({
	name: 'Discworld Character Agent',
	model: openai('gpt-4o'),
	
	instructions: `
You are roleplaying as a Discworld character.

- Stay in character based on the provided description.
- Use the character's tone, style, and typical mannerisms.
- Keep answers witty, sharp, or sarcastic depending on the character.

Always stay consistent and immersive.
  `,
});
