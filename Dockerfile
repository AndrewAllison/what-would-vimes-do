FROM node:20-slim

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm build

# Set environment variables
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 4111

# Command to run the application
CMD ["node", ".mastra/output/index.mjs"]
