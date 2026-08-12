import { Command } from 'commander';

import { registerCreateCommand } from './commands/create-command.js';
import { registerListCommand } from './commands/list-command.js';
import { registerShowCommand } from './commands/show-command.js';
import { registerUpdateCommand } from './commands/update-command.js';
import { resolveStoragePath } from './config/storage-path.js';
import { TicketNotFoundError } from './errors/ticket-not-found-error.js';
import { ValidationError } from './errors/validation-error.js';
import { JsonTicketRepository } from './repositories/json-ticket-repository.js';

const program = new Command().name('tickets');
const repository = new JsonTicketRepository(resolveStoragePath());

registerCreateCommand(program, repository);
registerListCommand(program, repository);
registerShowCommand(program, repository);
registerUpdateCommand(program, repository);

try {
  await program.parseAsync(process.argv);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Invalid input');
    process.exitCode = 1;
  } else if (error instanceof TicketNotFoundError) {
    console.error('Ticket not found');
    process.exitCode = 1;
  } else {
    throw error;
  }
}
