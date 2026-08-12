export type TicketPriority = 'low' | 'medium' | 'high';

export type TicketStatus = 'open';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  tags: string[];
}
