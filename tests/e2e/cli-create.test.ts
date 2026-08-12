import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import type { Ticket } from '../../src/models/ticket.js';

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true })
    ),
  );
});

describe('tickets create CLI', () => {
  it('creates and persists a ticket through the real CLI process', async () => {
    const temporaryDirectory = await mkdtemp(
      join(tmpdir(), 'tickets-cli-create-'),
    );
    temporaryDirectories.push(temporaryDirectory);
    const storagePath = join(temporaryDirectory, 'tickets.json');
    const tsxCliPath = resolve('node_modules', 'tsx', 'dist', 'cli.mjs');
    const projectCliPath = resolve('src', 'cli.ts');

    const result = spawnSync(
      process.execPath,
      [
        tsxCliPath,
        projectCliPath,
        'create',
        '--title',
        ' Fix login ',
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
    expect(result.status).toBe(0);

    const tickets = JSON.parse(
      await readFile(storagePath, 'utf8'),
    ) as Ticket[];

    expect(tickets).toHaveLength(1);
    expect(tickets[0]).toMatchObject({
      title: 'Fix login',
      status: 'open',
    });
  });
});
