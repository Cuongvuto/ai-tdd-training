import { randomUUID } from 'node:crypto';

import type { CreateTicketInput } from '../models/create-ticket-input.js';
import type { Ticket } from '../models/ticket.js';

export function createTicket({
  title,
  description,
  priority,
  tags,
}: CreateTicketInput): Ticket {
  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    throw new Error();
  }

  const normalizedPriority =
    priority === undefined ? 'medium' : priority.trim().toLowerCase();

  if (!['low', 'medium', 'high'].includes(normalizedPriority)) {
    throw new Error();
  }

  return {
    id: randomUUID(),
    title: normalizedTitle,
    status: 'open',
    description: description === undefined ? '' : description.trim(),
    priority: normalizedPriority as Ticket['priority'],
    tags: tags === undefined
      ? []
      : tags
          .map((tag) => tag.trim().toLowerCase())
          .filter((tag) => tag.length > 0)
          .filter((tag, index, normalizedTags) =>
            normalizedTags.indexOf(tag) === index
          ),
  };
}
