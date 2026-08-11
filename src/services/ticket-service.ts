export function createTicket({ title }: { title: string }) {
  return {
    title: title.trim(),
    status: 'open',
  };
}
