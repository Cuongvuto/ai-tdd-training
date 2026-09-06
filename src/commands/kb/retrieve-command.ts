import type { Command } from 'commander';

import type { KBClient } from '../../clients/kb-client.js';

export function registerKBRetrieveCommand(
  program: Command,
  client: KBClient,
): void {
  program
    .command('retrieve <documentId>')
    .action(async (documentId: string) => {
      const document = await client.retrieve(documentId);

      console.log(`ID: ${document.id}`);
      console.log(`Title: ${document.title}`);
      console.log(`Content: ${document.content}`);
      console.log(`Node Path: ${document.nodePath}`);
      console.log(`Tags: ${document.tags.join(', ')}`);
    });
}
