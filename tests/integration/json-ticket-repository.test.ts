import {
  access,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
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

  it('returns tickets read from valid JSON', async () => {
    temporaryDirectory = await mkdtemp(
      join(tmpdir(), 'json-ticket-repository-'),
    );
    const storagePath = join(temporaryDirectory, 'tickets.json');
    const ticket = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Fix login',
      description: '',
      status: 'open',
      priority: 'medium',
      tags: [],
    };
    await writeFile(storagePath, JSON.stringify([ticket]), 'utf8');
    const repository = new JsonTicketRepository(storagePath);

    await expect(repository.findAll()).resolves.toEqual([ticket]);
  });

  it('rejects invalid JSON without changing the corrupted file', async () => {
    temporaryDirectory = await mkdtemp(
      join(tmpdir(), 'json-ticket-repository-'),
    );
    const storagePath = join(temporaryDirectory, 'tickets.json');
    const corruptedContents = '[{"id": invalid JSON}]';
    await writeFile(storagePath, corruptedContents, 'utf8');
    const repository = new JsonTicketRepository(storagePath);

    await expect(repository.findAll()).rejects.toBeInstanceOf(SyntaxError);
    await expect(readFile(storagePath, 'utf8')).resolves.toBe(
      corruptedContents,
    );
  });
});
