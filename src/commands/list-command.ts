import type { Command } from 'commander';

import type { TicketFilter } from '../models/ticket-filter.js';
import type {
  TicketPriority,
  TicketStatus,
} from '../models/ticket.js';
import type { TicketRepository } from '../repositories/ticket-repository.js';
import { listTickets } from '../services/ticket-service.js';

interface ListCommandOptions {
  status?: string;
  priority?: string;
  tags?: string;
}

export function registerListCommand(
  program: Command,
  repository: TicketRepository,
): void {
  program
    .command('list')
    .option('--status <status>')
    .option('--priority <priority>')
    .option('--tags <tags>')
    .action(async (options: ListCommandOptions) => {
      const filter: TicketFilter = {
        ...(options.status === undefined
          ? {}
          : { status: options.status as TicketStatus }),
        ...(options.priority === undefined
          ? {}
          : { priority: options.priority as TicketPriority }),
        ...(options.tags === undefined
          ? {}
          : { tags: options.tags.split(',') }),
      };
      const tickets = await listTickets(repository, filter);

      for (const ticket of tickets) {
        console.log(ticket.title);
      }
    });
}
