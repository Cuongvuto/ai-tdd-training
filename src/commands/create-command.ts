import type { Command } from 'commander';

import type { TicketRepository } from '../repositories/ticket-repository.js';
import { createTicket } from '../services/ticket-service.js';

interface CreateCommandOptions {
  title: string;
  description?: string;
  priority?: string;
  tags?: string;
}

export function registerCreateCommand(
  program: Command,
  repository: TicketRepository,
): void {
  program
    .command('create')
    .requiredOption('--title <title>')
    .option('--description <description>')
    .option('--priority <priority>')
    .option('--tags <tags>')
    .action(async (options: CreateCommandOptions) => {
      const ticket = createTicket({
        title: options.title,
        ...(options.description === undefined
          ? {}
          : { description: options.description }),
        ...(options.priority === undefined
          ? {}
          : { priority: options.priority }),
        ...(options.tags === undefined
          ? {}
          : { tags: options.tags.split(',') }),
      });

      await repository.save(ticket);
      console.log(`Created ticket: ${ticket.title}`);
    });
}
