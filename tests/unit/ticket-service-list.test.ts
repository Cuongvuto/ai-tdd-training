import { describe, expect, it } from 'vitest';

import type { Ticket } from '../../src/models/ticket.js';
import type { TicketRepository } from '../../src/repositories/ticket-repository.js';
import { listTickets } from '../../src/services/ticket-service.js';

class FakeTicketRepository implements TicketRepository {
  constructor(private readonly tickets: Ticket[]) {}

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

describe('listTickets', () => {
  it('returns every repository ticket in repository order', async () => {
    const ticketA: Ticket = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Fix login',
      description: 'Login button does not work',
      status: 'open',
      priority: 'high',
      tags: ['bug', 'auth'],
    };
    const ticketB: Ticket = {
      id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      title: 'Write documentation',
      description: '',
      status: 'closed',
      priority: 'low',
      tags: ['docs'],
    };
    const repository = new FakeTicketRepository([ticketA, ticketB]);

    await expect(listTickets(repository)).resolves.toEqual([ticketA, ticketB]);
  });
});
