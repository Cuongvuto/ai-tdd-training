import type { Command } from 'commander';

import type { KBClient } from '../../clients/kb-client.js';

interface KBSearchCommandOptions {
  topK: number;
}

export function registerKBSearchCommand(
  program: Command,
  client: KBClient,
): void {
  program
    .command('search <query>')
    .requiredOption('--top-k <number>', 'maximum number of results', Number)
    .action(async (query: string, options: KBSearchCommandOptions) => {
      const results = await client.search({
        query,
        topK: options.topK,
      });

      for (const result of results) {
        console.log(`${result.document.title} [${result.matchType}]`);
      }
    });
}
