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

## 🚀 Deployment Options

You can deploy this application using Docker for a containerized environment. A migration to AWS is currently in progress.

### 🐳 Deployment with Docker

#### Prerequisites

- Docker and Docker Compose installed on your system
- OpenAI API key

### Deployment Steps

#### Option 1: Using the deployment script

1. Make the script executable (if not already):
   ```bash
   chmod +x deploy.sh
   ```

2. Run the deployment script with your OpenAI API key:
   ```bash
   OPENAI_API_KEY=your_api_key_here ./deploy.sh
   ```

#### Option 2: Using npm/pnpm scripts

1. Deploy the application:
   ```bash
   OPENAI_API_KEY=your_api_key_here pnpm deploy
   ```

2. Or use individual Docker commands:
   ```bash
   # Build the Docker image
   pnpm docker:build

   # Start the container
   OPENAI_API_KEY=your_api_key_here pnpm docker:up

   # Stop the container
   pnpm docker:down
   ```

#### Option 3: Using Docker Compose directly

1. Build and start the Docker container:
   ```bash
   OPENAI_API_KEY=your_api_key_here docker-compose up -d
   ```

2. Access the application:
   - The application will be available at `http://localhost:4111`
   - The playground interface will be available at `http://localhost:4111/playground`

3. Stop the container:
   ```bash
   docker-compose down
   ```

### 🔄 AWS Deployment

The application can be deployed to AWS using Terraform and the provided infrastructure code.

#### Prerequisites

- AWS CLI installed and configured with the `vimes-user` profile
- Terraform installed
- Docker installed

#### Deployment Steps

1. Initialize Terraform:
   ```bash
   cd infra
   terraform init
   ```

2. Apply the Terraform configuration:
   ```bash
   terraform apply
   ```

3. Push the Docker image to ECR using the provided script:
   ```bash
   ./push_to_ecr.sh
   ```

   This script will:
   - Assume the ECR push role created by Terraform
   - Log in to ECR
   - Build and tag the Docker image
   - Push the Docker image to ECR

4. Once the image is pushed, Terraform will be able to complete the ECS service deployment.

#### Troubleshooting

If you encounter timeout issues during Terraform apply, it might be because the Docker image hasn't been pushed to ECR yet. Run the `push_to_ecr.sh` script and then try applying Terraform again.

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `PORT`: The port on which the server will run (default: 4111)
- `NODE_ENV`: The environment mode (default: production for Docker deployment)

A `.env.example` file is provided as a template. You can copy it to create your own environment files:

```bash
# For development
cp .env.example .env.development
# Edit .env.development with your actual values

# For production
cp .env.example .env
# Edit .env with your actual values
```

### Persistent Data

The application stores data in a SQLite database file (`.mastra/mastra.db`). This file is mounted as a volume in the Docker container to ensure data persistence between container restarts.

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
