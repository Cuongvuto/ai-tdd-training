import type { Ticket } from '../models/ticket.js';

export interface TicketRepository {
  findAll(): Promise<Ticket[]>;
  save(ticket: Ticket): Promise<void>;
}
