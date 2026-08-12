import type { TicketStatus } from './ticket.js';

export interface UpdateTicketInput {
  id: string;
  status: TicketStatus;
}
