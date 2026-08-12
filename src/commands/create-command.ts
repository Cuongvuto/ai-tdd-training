import type { Command } from 'commander';

import type { TicketRepository } from '../repositories/ticket-repository.js';
import { createTicket } from '../services/ticket-service.js';

interface CreateCommandOptions {
  title: string;
}

export function registerCreateCommand(
  program: Command,
  repository: TicketRepository,
): void {
  program
    .command('create')
    .requiredOption('--title <title>')
    .action(async ({ title }: CreateCommandOptions) => {
      const ticket = createTicket({ title });

      await repository.save(ticket);
    });
}
