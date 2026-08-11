export function createTicket({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    throw new Error();
  }

  const ticket = {
    title: normalizedTitle,
    status: 'open',
  };

  if (description === undefined) {
    return ticket;
  }

  return {
    ...ticket,
    description: description.trim(),
  };
}
