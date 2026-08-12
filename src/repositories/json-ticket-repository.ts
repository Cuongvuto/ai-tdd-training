import { readFile, writeFile } from 'node:fs/promises';

import type { Ticket } from '../models/ticket.js';
import type { TicketRepository } from './ticket-repository.js';

export class JsonTicketRepository implements TicketRepository {
  constructor(private readonly storagePath: string) {}

  async save(ticket: Ticket): Promise<void> {
    await writeFile(this.storagePath, JSON.stringify([ticket]), 'utf8');
  }

  async findAll(): Promise<Ticket[]> {
    try {
      const contents = await readFile(this.storagePath, 'utf8');

      return JSON.parse(contents) as Ticket[];
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'ENOENT'
      ) {
        return [];
      }

      throw error;
    }
  }
}
