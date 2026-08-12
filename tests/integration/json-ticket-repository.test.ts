import { access, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { JsonTicketRepository } from '../../src/repositories/json-ticket-repository.js';

describe('JsonTicketRepository', () => {
  let temporaryDirectory: string | undefined;

  afterEach(async () => {
    if (temporaryDirectory !== undefined) {
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });

  it('returns an empty array without creating a missing JSON file', async () => {
    temporaryDirectory = await mkdtemp(
      join(tmpdir(), 'json-ticket-repository-'),
    );
    const storagePath = join(temporaryDirectory, 'tickets.json');
    const repository = new JsonTicketRepository(storagePath);

    await expect(repository.findAll()).resolves.toEqual([]);
    await expect(access(storagePath)).rejects.toMatchObject({ code: 'ENOENT' });
  });
});
