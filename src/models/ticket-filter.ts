import type {
  TicketPriority,
  TicketStatus,
} from './ticket.js';

export interface TicketFilter {
  status?: TicketStatus;
  priority?: TicketPriority;
}
