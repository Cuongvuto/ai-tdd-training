import { randomUUID } from 'node:crypto';

import { TicketNotFoundError } from '../errors/ticket-not-found-error.js';
import { ValidationError } from '../errors/validation-error.js';
import type { CreateTicketInput } from '../models/create-ticket-input.js';
import type { Ticket } from '../models/ticket.js';
import type { TicketFilter } from '../models/ticket-filter.js';
import type { UpdateTicketInput } from '../models/update-ticket-input.js';
import type { TicketRepository } from '../repositories/ticket-repository.js';

export async function listTickets(
  repository: TicketRepository,
  filter?: TicketFilter,
): Promise<Ticket[]> {
  const tickets = await repository.findAll();

  if (
    filter?.status === undefined &&
    filter?.priority === undefined
  ) {
    return tickets;
  }

  return tickets.filter((ticket) =>
    (filter.status === undefined || ticket.status === filter.status) &&
    (filter.priority === undefined || ticket.priority === filter.priority)
  );
}

export async function getTicketById(
  repository: TicketRepository,
  id: string,
): Promise<Ticket> {
  const ticket = await repository.findById(id);

  if (ticket === undefined) {
    throw new TicketNotFoundError();
  }

  return ticket;
}

export async function updateTicketStatus(
  repository: TicketRepository,
  input: UpdateTicketInput,
): Promise<Ticket> {
  if (!['open', 'in_progress', 'closed'].includes(input.status)) {
    throw new ValidationError();
  }

  const ticket = await getTicketById(repository, input.id);
  const updatedTicket = {
    ...ticket,
    status: input.status,
  };

  await repository.update(updatedTicket);

  return updatedTicket;
}

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
