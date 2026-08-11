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

  return {
    title: normalizedTitle,
    status: 'open',
    description: description === undefined ? '' : description.trim(),
    priority: 'medium',
  };
}
