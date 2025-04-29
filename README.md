# What Would Vimes Do?

A Discworld character advisor built with Mastra and OpenAI. This application allows you to ask questions and receive responses in the style of characters from Terry Pratchett's Discworld novels.

## 🧙‍♂️ Overview

"What Would Vimes Do?" is an AI-powered application that simulates conversations with characters from the Discworld series. Currently, it supports:

- **Sam Vimes**: Commander of the Ankh-Morpork City Watch, known for his gruff demeanor and strong moral compass
- **Nanny Ogg**: A senior witch from Lancre, cheerful, mischievous, and always ready with folksy wisdom

The application uses OpenAI's GPT-4o model to generate responses that match each character's unique personality, speaking style, and background.

## ✨ Features

- Character selection based on name
- Natural language processing to understand user questions
- AI-generated responses that mimic the selected character's style
- Workflow-based architecture using Mastra framework

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd what-would-vimes-do
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env.development` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## 🔧 Usage

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Use the application by providing a character name and a question:
   ```typescript
   // Example usage
   const response = await mastra.workflows.discworldAdvisorWorkflow.trigger({
     characterName: "Sam Vimes",
     userQuestion: "What do you think about politics?"
   });
   
   console.log(response.reply);
   ```

## 🧩 Project Structure

- `src/mastra/index.ts` - Main entry point
- `src/mastra/agents/` - Contains the AI agent configuration
- `src/mastra/tools/` - Contains tools like the character selector
- `src/mastra/workflows/` - Contains the main workflow for processing requests
- `src/mastra/_data/` - Contains character data
- `src/mastra/utils/` - Contains utility functions

## 📦 Dependencies

- [@mastra/core](https://github.com/mastrajs/mastra) - Framework for building AI applications
- [@ai-sdk/openai](https://github.com/vercel/ai) - SDK for working with OpenAI models
- [zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation

## 📝 Adding New Characters

To add new Discworld characters, update the `src/mastra/_data/characters.json` file with new character entries following the existing format:

```json
{
  "name": "Character Name",
  "personality": "Description of personality traits",
  "speakingStyle": "Description of speaking style",
  "catchPhrases": ["Phrase 1", "Phrase 2"],
  "background": "Character background information"
}
```

## 📜 License

ISC

---

*"THERE'S NO JUSTICE. THERE'S JUST ME." - Death*
