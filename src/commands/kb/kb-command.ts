import type { Command } from 'commander';

import type { KBClient } from '../../clients/kb-client.js';
import { registerKBAddCommand } from './add-command.js';
import { registerKBListCommand } from './list-command.js';
import { registerKBRetrieveCommand } from './retrieve-command.js';
import { registerKBSearchCommand } from './search-command.js';

export function registerKBCommand(
  program: Command,
  client: KBClient,
): void {
  const kbCommand = program.command('kb');

  registerKBAddCommand(kbCommand, client);
  registerKBSearchCommand(kbCommand, client);
  registerKBListCommand(kbCommand, client);
  registerKBRetrieveCommand(kbCommand, client);
}
