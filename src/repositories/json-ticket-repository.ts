import { readFile, writeFile } from 'node:fs/promises';

import type { Ticket } from '../models/ticket.js';
import type { TicketRepository } from './ticket-repository.js';

export class JsonTicketRepository implements TicketRepository {
  constructor(private readonly storagePath: string) {}

  async findById(id: string): Promise<Ticket | undefined> {
    const tickets = await this.findAll();

    return tickets.find((ticket) => ticket.id === id);
  }

  async save(ticket: Ticket): Promise<void> {
    const tickets = await this.findAll();

    await writeFile(
      this.storagePath,
      JSON.stringify([...tickets, ticket]),
      'utf8',
    );
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
