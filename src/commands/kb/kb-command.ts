import type { Command } from 'commander';

import type { KBClient } from '../../clients/kb-client.js';
import { registerKBListCommand } from './list-command.js';
import { registerKBSearchCommand } from './search-command.js';

export function registerKBCommand(
  program: Command,
  client: KBClient,
): void {
  const kbCommand = program.command('kb');

  registerKBSearchCommand(kbCommand, client);
  registerKBListCommand(kbCommand, client);
}
