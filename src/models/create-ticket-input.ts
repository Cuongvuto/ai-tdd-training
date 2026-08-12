export interface CreateTicketInput {
  title: string;
  description?: string;
  priority?: string;
  tags?: string[];
}
