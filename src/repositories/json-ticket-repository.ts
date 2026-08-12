import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { StorageError } from '../errors/storage-error.js';
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

    await mkdir(dirname(this.storagePath), { recursive: true });
    await writeFile(
      this.storagePath,
      JSON.stringify([...tickets, ticket]),
      'utf8',
    );
  }

  async update(ticket: Ticket): Promise<void> {
    const tickets = await this.findAll();
    const updatedTickets = tickets.map((storedTicket) =>
      storedTicket.id === ticket.id ? ticket : storedTicket
    );

    await writeFile(
      this.storagePath,
      JSON.stringify(updatedTickets),
      'utf8',
    );
  }

  async findAll(): Promise<Ticket[]> {
    let contents: string;

    try {
      contents = await readFile(this.storagePath, 'utf8');
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

    try {
      return JSON.parse(contents) as Ticket[];
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new StorageError();
      }

      throw error;
    }
  }
}
