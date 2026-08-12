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

  return {
    title: normalizedTitle,
    status: 'open',
    description: description === undefined ? '' : description.trim(),
    priority:
      priority === undefined ? 'medium' : priority.trim().toLowerCase(),
  };
}
