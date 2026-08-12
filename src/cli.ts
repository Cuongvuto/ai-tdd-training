import { Command } from 'commander';

import { registerCreateCommand } from './commands/create-command.js';
import { registerListCommand } from './commands/list-command.js';
import { resolveStoragePath } from './config/storage-path.js';
import { JsonTicketRepository } from './repositories/json-ticket-repository.js';

const program = new Command().name('tickets');
const repository = new JsonTicketRepository(resolveStoragePath());

registerCreateCommand(program, repository);
registerListCommand(program, repository);

await program.parseAsync(process.argv);
