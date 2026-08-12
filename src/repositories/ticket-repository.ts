import type { Ticket } from '../models/ticket.js';

export interface TicketRepository {
  findAll(): Promise<Ticket[]>;
  findById(id: string): Promise<Ticket | undefined>;
  save(ticket: Ticket): Promise<void>;
}
