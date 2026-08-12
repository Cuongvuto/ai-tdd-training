export function createTicket({
  title,
  description,
  priority,
  tags,
}: {
  title: string;
  description?: string;
  priority?: string;
  tags?: string[];
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
