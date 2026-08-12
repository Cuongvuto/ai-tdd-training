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

import type { Ticket } from '../../src/models/ticket.js';
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

    const caughtError: unknown = await repository
      .findAll()
      .catch((error: unknown) => error);

    expect.soft(caughtError).toBeInstanceOf(Error);
    expect.soft((caughtError as Error).constructor.name).toBe('StorageError');
    await expect(readFile(storagePath, 'utf8')).resolves.toBe(
      corruptedContents,
    );
  });

  it('saves the first ticket to a missing JSON file', async () => {
    temporaryDirectory = await mkdtemp(
      join(tmpdir(), 'json-ticket-repository-'),
    );
    const storagePath = join(temporaryDirectory, 'tickets.json');
    const ticket: Ticket = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Fix login',
      description: '',
      status: 'open',
      priority: 'medium',
      tags: [],
    };
    const repository = new JsonTicketRepository(storagePath);

    await repository.save(ticket);

    await expect(access(storagePath)).resolves.toBeUndefined();
    const reloadedRepository = new JsonTicketRepository(storagePath);
    await expect(reloadedRepository.findAll()).resolves.toEqual([ticket]);
  });

  it('creates missing parent directories when saving a ticket', async () => {
    temporaryDirectory = await mkdtemp(
      join(tmpdir(), 'json-ticket-repository-'),
    );
    const storageDirectory = join(temporaryDirectory, 'nested', 'data');
    const storagePath = join(storageDirectory, 'tickets.json');
    const ticket: Ticket = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Fix login',
      description: '',
      status: 'open',
      priority: 'medium',
      tags: [],
    };
    const repository = new JsonTicketRepository(storagePath);

    await expect(access(storageDirectory)).rejects.toMatchObject({
      code: 'ENOENT',
    });

    await repository.save(ticket);

    await expect(access(storagePath)).resolves.toBeUndefined();
    await expect(repository.findAll()).resolves.toEqual([ticket]);
    expect(JSON.parse(await readFile(storagePath, 'utf8'))).toEqual([ticket]);
  });

  it('preserves existing tickets when saving another ticket', async () => {
    temporaryDirectory = await mkdtemp(
      join(tmpdir(), 'json-ticket-repository-'),
    );
    const storagePath = join(temporaryDirectory, 'tickets.json');
    const ticketA: Ticket = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Fix login',
      description: '',
      status: 'open',
      priority: 'medium',
      tags: [],
    };
    const ticketB: Ticket = {
      id: '7a1e9d8f-6372-4c98-a27d-fefdb636f102',
      title: 'Add logout',
      description: '',
      status: 'open',
      priority: 'medium',
      tags: [],
    };
    await writeFile(storagePath, JSON.stringify([ticketA]), 'utf8');
    const repository = new JsonTicketRepository(storagePath);

    await repository.save(ticketB);

    await expect(repository.findAll()).resolves.toEqual([ticketA, ticketB]);
  });

  it('finds an existing ticket by ID', async () => {
    temporaryDirectory = await mkdtemp(
      join(tmpdir(), 'json-ticket-repository-'),
    );
    const storagePath = join(temporaryDirectory, 'tickets.json');
    const ticketA: Ticket = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Fix login',
      description: '',
      status: 'open',
      priority: 'medium',
      tags: [],
    };
    const ticketB: Ticket = {
      id: '7a1e9d8f-6372-4c98-a27d-fefdb636f102',
      title: 'Add logout',
      description: '',
      status: 'open',
      priority: 'medium',
      tags: [],
    };
    await writeFile(
      storagePath,
      JSON.stringify([ticketA, ticketB]),
      'utf8',
    );
    const repository = new JsonTicketRepository(storagePath);

    await expect(repository.findById(ticketB.id)).resolves.toEqual(ticketB);
  });

  it('returns undefined when no ticket has the requested ID', async () => {
    temporaryDirectory = await mkdtemp(
      join(tmpdir(), 'json-ticket-repository-'),
    );
    const storagePath = join(temporaryDirectory, 'tickets.json');
    const ticket: Ticket = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Fix login',
      description: '',
      status: 'open',
      priority: 'medium',
      tags: [],
    };
    await writeFile(storagePath, JSON.stringify([ticket]), 'utf8');
    const repository = new JsonTicketRepository(storagePath);

    await expect(repository.findById('missing-id')).resolves.toBeUndefined();
  });

  it('replaces an existing ticket by ID without changing its position', async () => {
    temporaryDirectory = await mkdtemp(
      join(tmpdir(), 'json-ticket-repository-'),
    );
    const storagePath = join(temporaryDirectory, 'tickets.json');
    const ticketA = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Fix login',
      description: '',
      status: 'open' as const,
      priority: 'medium' as const,
      tags: [],
    };
    const ticketB = {
      id: '7a1e9d8f-6372-4c98-a27d-fefdb636f102',
      title: 'Add logout',
      description: '',
      status: 'open' as const,
      priority: 'medium' as const,
      tags: [],
    };
    const updatedTicketB = {
      ...ticketB,
      status: 'closed' as const,
    };
    await writeFile(
      storagePath,
      JSON.stringify([ticketA, ticketB]),
      'utf8',
    );
    const repository = new JsonTicketRepository(storagePath);

    await repository.update(updatedTicketB);

    await expect(repository.findAll()).resolves.toEqual([
      ticketA,
      updatedTicketB,
    ]);
  });
});
