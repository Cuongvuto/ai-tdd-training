import type { Command } from 'commander';

import type { TicketRepository } from '../repositories/ticket-repository.js';
import { getTicketById } from '../services/ticket-service.js';

export function registerShowCommand(
  program: Command,
  repository: TicketRepository,
): void {
  program
    .command('show <id>')
    .action(async (id: string) => {
      const ticket = await getTicketById(repository, id);

      console.log(`ID: ${ticket.id}`);
      console.log(`Title: ${ticket.title}`);
      console.log(`Description: ${ticket.description}`);
      console.log(`Status: ${ticket.status}`);
      console.log(`Priority: ${ticket.priority}`);
      console.log(`Tags: ${ticket.tags.join(', ')}`);
    });
}
