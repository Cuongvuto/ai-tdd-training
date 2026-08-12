import type { Command } from 'commander';

import type { TicketStatus } from '../models/ticket.js';
import type { TicketRepository } from '../repositories/ticket-repository.js';
import { updateTicketStatus } from '../services/ticket-service.js';

interface UpdateCommandOptions {
  status: string;
}

export function registerUpdateCommand(
  program: Command,
  repository: TicketRepository,
): void {
  program
    .command('update <id>')
    .requiredOption('--status <status>')
    .action(async (id: string, options: UpdateCommandOptions) => {
      await updateTicketStatus(repository, {
        id,
        status: options.status as TicketStatus,
      });
    });
}
