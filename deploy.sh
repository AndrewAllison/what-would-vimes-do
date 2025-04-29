#!/bin/bash

# Exit on error
set -e

# Check if OPENAI_API_KEY is provided
if [ -z "$OPENAI_API_KEY" ]; then
  echo "Error: OPENAI_API_KEY environment variable is required"
  echo "Usage: OPENAI_API_KEY=your_api_key_here ./deploy.sh"
  exit 1
fi

# Build and start the Docker container
echo "Building and starting the Docker container..."
docker-compose up -d --build

# Check if the container is running
if [ "$(docker-compose ps -q app)" ]; then
  echo "Container is running!"
  echo "The application is now available at http://localhost:4111"
  echo "The playground interface is available at http://localhost:4111/playground"
else
  echo "Error: Container failed to start"
  docker-compose logs app
  exit 1
fi

echo ""
echo "To stop the container, run: docker-compose down"
