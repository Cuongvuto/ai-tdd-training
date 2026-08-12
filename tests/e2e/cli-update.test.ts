import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import type { Ticket } from '../../src/models/ticket.js';

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

describe('tickets update CLI', () => {
  it('updates only the status of an existing ticket', async () => {
    const temporaryDirectory = await mkdtemp(
      join(tmpdir(), 'tickets-cli-update-'),
    );
    temporaryDirectories.push(temporaryDirectory);

    const storagePath = join(temporaryDirectory, 'tickets.json');
    const ticket: Ticket = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Fix login',
      description: 'Authentication is broken',
      status: 'open',
      priority: 'high',
      tags: ['bug', 'auth'],
    };

    await writeFile(storagePath, JSON.stringify([ticket]), 'utf8');

    const tsxCliPath = resolve('node_modules', 'tsx', 'dist', 'cli.mjs');
    const projectCliPath = resolve('src', 'cli.ts');
    const result = spawnSync(
      process.execPath,
      [
        tsxCliPath,
        projectCliPath,
        'update',
        ticket.id,
        '--status',
        'closed',
      ],
      {
        cwd: process.cwd(),
        encoding: 'utf8',
        env: {
          ...process.env,
          TICKETS_FILE: storagePath,
        },
      },
    );

    expect(result.error).toBeUndefined();
    expect(result.status, result.stderr).toBe(0);

    const persistedTickets = JSON.parse(
      await readFile(storagePath, 'utf8'),
    ) as Ticket[];

    expect(persistedTickets).toEqual([{ ...ticket, status: 'closed' }]);
    expect.soft(result.stdout).toContain(ticket.id);
    expect.soft(result.stdout).toContain('closed');
  });
});
