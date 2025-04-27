export interface CharacterProfile {
	name: string;
	personality: string;
	speakingStyle: string;
	catchPhrases: string[];
	background: string;
}

export function formatPromptForCharacter(character: CharacterProfile, userQuestion: string): string {
	console.log('Formatting prompt for character:', character);
	const catchPhrasesFormatted = character.catchPhrases.map(phrase => `- ${phrase}`).join('\n');
	
	return `
You are ${character.name} from Terry Pratchett's Discworld novels.

Personality traits:
- ${character.personality}

Speaking style:
- ${character.speakingStyle}

Typical catchphrases:
${catchPhrasesFormatted}

Background:
- ${character.background}

Stay fully in character when responding.
Your tone, mannerisms, and attitude must match ${character.name} exactly.

Here is the user's question:
"${userQuestion}"

Reply naturally, staying consistent with ${character.name}'s known behaviors and voice.
`.trim();
}
