import { resolve } from 'node:path';

export function resolveStoragePath(): string {
  return process.env.TICKETS_FILE ?? resolve(process.cwd(), 'data', 'tickets.json');
}
