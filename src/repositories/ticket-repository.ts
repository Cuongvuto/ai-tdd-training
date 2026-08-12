import type { Ticket } from '../models/ticket.js';

export interface TicketRepository {
  findAll(): Promise<Ticket[]>;
}
