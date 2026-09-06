import { describe, expect, it } from 'vitest';

import { TicketNotFoundError } from '../../src/errors/ticket-not-found-error.js';
import type { Ticket } from '../../src/models/ticket.js';
import type { TicketRepository } from '../../src/repositories/ticket-repository.js';
import { getTicketById } from '../../src/services/ticket-service.js';

class FakeTicketRepository implements TicketRepository {
  constructor(private readonly tickets: Ticket[] = []) {}

  async findAll(): Promise<Ticket[]> {
    return this.tickets;
  }

  async findById(id: string): Promise<Ticket | undefined> {
    return this.tickets.find((ticket) => ticket.id === id);
  }

  async save(ticket: Ticket): Promise<void> {
    this.tickets.push(ticket);
  }

  async update(_ticket: Ticket): Promise<void> {}
}

describe('getTicketById', () => {
  it('rejects with TicketNotFoundError when the ticket is missing', async () => {
    const repository = new FakeTicketRepository();

    await expect(
      getTicketById(repository, 'missing-id'),
    ).rejects.toBeInstanceOf(TicketNotFoundError);
  });
});
