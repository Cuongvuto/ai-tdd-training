import type { Command } from 'commander';

import type { TicketRepository } from '../repositories/ticket-repository.js';
import { listTickets } from '../services/ticket-service.js';

export function registerListCommand(
  program: Command,
  repository: TicketRepository,
): void {
  program
    .command('list')
    .action(async () => {
      const tickets = await listTickets(repository);

      for (const ticket of tickets) {
        console.log(ticket.title);
      }
    });
}
