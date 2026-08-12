import { describe, expect, it } from 'vitest';

import type { Ticket } from '../../src/models/ticket.js';
import type { TicketRepository } from '../../src/repositories/ticket-repository.js';
import { updateTicketStatus } from '../../src/services/ticket-service.js';

class FakeTicketRepository implements TicketRepository {
  updatedTicket: Ticket | undefined;

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

  async update(ticket: Ticket): Promise<void> {
    this.updatedTicket = ticket;
  }
}

describe('updateTicketStatus', () => {
  it('updates the status while preserving all other ticket fields', async () => {
    const ticket: Ticket = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Fix login',
      description: 'Login button does not work',
      status: 'open',
      priority: 'high',
      tags: ['bug', 'auth'],
    };
    const repository = new FakeTicketRepository([ticket]);
    const expectedTicket: Ticket = {
      ...ticket,
      status: 'closed',
    };

    const updatedTicket = await updateTicketStatus(repository, {
      id: ticket.id,
      status: 'closed',
    });

    expect(updatedTicket).toEqual(expectedTicket);
    expect(repository.updatedTicket).toEqual(expectedTicket);
  });
});
