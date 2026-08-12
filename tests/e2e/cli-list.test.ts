import { spawnSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
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

describe('tickets list CLI', () => {
  it('lists stored ticket titles in repository order', async () => {
    const temporaryDirectory = await mkdtemp(
      join(tmpdir(), 'tickets-cli-list-'),
    );
    temporaryDirectories.push(temporaryDirectory);
    const storagePath = join(temporaryDirectory, 'tickets.json');
    const ticketA: Ticket = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Fix login',
      description: 'Authentication is broken',
      status: 'open',
      priority: 'high',
      tags: ['bug', 'auth'],
    };
    const ticketB: Ticket = {
      id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      title: 'Write documentation',
      description: '',
      status: 'closed',
      priority: 'low',
      tags: ['docs'],
    };
    await writeFile(
      storagePath,
      JSON.stringify([ticketA, ticketB]),
      'utf8',
    );

    const tsxCliPath = resolve('node_modules', 'tsx', 'dist', 'cli.mjs');
    const projectCliPath = resolve('src', 'cli.ts');
    const result = spawnSync(
      process.execPath,
      [tsxCliPath, projectCliPath, 'list'],
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
    expect(result.stdout).toContain('Fix login');
    expect(result.stdout).toContain('Write documentation');
    expect(result.stdout.indexOf('Fix login')).toBeLessThan(
      result.stdout.indexOf('Write documentation'),
    );
  });

  it('lists only tickets matching combined CLI filters', async () => {
    const temporaryDirectory = await mkdtemp(
      join(tmpdir(), 'tickets-cli-list-'),
    );
    temporaryDirectories.push(temporaryDirectory);
    const storagePath = join(temporaryDirectory, 'tickets.json');
    const tickets: Ticket[] = [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Fix login',
        description: 'Authentication is broken',
        status: 'open',
        priority: 'high',
        tags: ['bug', 'auth'],
      },
      {
        id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        title: 'Write documentation',
        description: '',
        status: 'open',
        priority: 'low',
        tags: ['docs'],
      },
      {
        id: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
        title: 'Investigate auth',
        description: '',
        status: 'closed',
        priority: 'high',
        tags: ['bug', 'auth'],
      },
      {
        id: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
        title: 'Minor login cleanup',
        description: '',
        status: 'open',
        priority: 'high',
        tags: ['bug'],
      },
    ];
    await writeFile(storagePath, JSON.stringify(tickets), 'utf8');

    const tsxCliPath = resolve('node_modules', 'tsx', 'dist', 'cli.mjs');
    const projectCliPath = resolve('src', 'cli.ts');
    const result = spawnSync(
      process.execPath,
      [
        tsxCliPath,
        projectCliPath,
        'list',
        '--status',
        'open',
        '--priority',
        'high',
        '--tags',
        'bug,auth',
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
    expect(result.stdout).toContain('Fix login');
    expect(result.stdout).not.toContain('Write documentation');
    expect(result.stdout).not.toContain('Investigate auth');
    expect(result.stdout).not.toContain('Minor login cleanup');
  });
});
