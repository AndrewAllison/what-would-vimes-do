import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { discworldCharacterAgent } from './agents/discworld-character.agent';
import { discworldAdvisorWorkflow } from './workflows/discworld-advisor.workflow';
import { LibSQLStore } from '@mastra/libsql';

export const mastra = new Mastra({
	workflows: { discworldAdvisorWorkflow },
	agents: { discworldCharacterAgent },
	logger: createLogger({
		name: 'Mastra',
		level: 'info',
	}),
	storage: new LibSQLStore({
		url: 'file:../mastra.db',
	})
});
