# Build stage
FROM node:lts AS build
WORKDIR /app

COPY . .

# Install and build
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm build

# Final stage
FROM node:lts
WORKDIR /app

COPY --from=build /app/.mastra/output ./output
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/telemetry-config.mjs ./
COPY --from=build /app/.mastra/output/instrumentation.mjs ./

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --prod

EXPOSE 4111
CMD ["node", "--import=./instrumentation.mjs", "./output/index.mjs"]
