import type { Command } from 'commander';

import type { KBClient } from '../../clients/kb-client.js';
import { registerKBListCommand } from './list-command.js';

export function registerKBCommand(
  program: Command,
  client: KBClient,
): void {
  const kbCommand = program.command('kb');

  registerKBListCommand(kbCommand, client);
}
