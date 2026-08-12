export function createTicket({
  title,
  description,
  priority,
}: {
  title: string;
  description?: string;
  priority?: string;
}) {
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
    title: normalizedTitle,
    status: 'open',
    description: description === undefined ? '' : description.trim(),
    priority: normalizedPriority,
    tags: [],
  };
}
