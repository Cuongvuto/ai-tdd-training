import type { TicketStatus } from './ticket.js';

export interface TicketFilter {
  status?: TicketStatus;
}
