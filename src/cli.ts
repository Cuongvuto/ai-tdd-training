#!/usr/bin/env node

import { Command } from 'commander';

import { MockKBClient } from './clients/mock-kb-client.js';
import { registerCreateCommand } from './commands/create-command.js';
import { registerKBCommand } from './commands/kb/kb-command.js';
import { registerListCommand } from './commands/list-command.js';
import { registerShowCommand } from './commands/show-command.js';
import { registerUpdateCommand } from './commands/update-command.js';
import { resolveStoragePath } from './config/storage-path.js';
import { KBAddFileError } from './errors/kb-add-file-error.js';
import { KBDocumentNotFoundError } from './errors/kb-document-not-found-error.js';
import { StorageError } from './errors/storage-error.js';
import { TicketNotFoundError } from './errors/ticket-not-found-error.js';
import { ValidationError } from './errors/validation-error.js';
import { JsonTicketRepository } from './repositories/json-ticket-repository.js';

const program = new Command().name('tickets');
const repository = new JsonTicketRepository(resolveStoragePath());
const kbClient = new MockKBClient();

registerCreateCommand(program, repository);
registerListCommand(program, repository);
registerShowCommand(program, repository);
registerUpdateCommand(program, repository);
registerKBCommand(program, kbClient);

try {
  await program.parseAsync(process.argv);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Invalid input');
    process.exitCode = 1;
  } else if (error instanceof TicketNotFoundError) {
    console.error('Ticket not found');
    process.exitCode = 1;
  } else if (error instanceof StorageError) {
    console.error('Storage error');
    process.exitCode = 1;
  } else if (error instanceof KBDocumentNotFoundError) {
    console.error('KB document not found');
    process.exitCode = 1;
  } else if (error instanceof KBAddFileError) {
    console.error('KB file error');
    process.exitCode = 1;
  } else {
    throw error;
  }
}
