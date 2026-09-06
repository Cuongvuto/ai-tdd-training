import type { Command } from 'commander';

import type { KBClient } from '../../clients/kb-client.js';

interface KBListCommandOptions {
  node: string;
  limit: number;
}

export function registerKBListCommand(
  program: Command,
  client: KBClient,
): void {
  program
    .command('list')
    .requiredOption('--node <path>')
    .requiredOption('--limit <number>', 'maximum number of documents', Number)
    .action(async (options: KBListCommandOptions) => {
      const documents = await client.list({
        nodePath: options.node,
        limit: options.limit,
      });

      for (const document of documents) {
        console.log(document.title);
      }
    });
}
