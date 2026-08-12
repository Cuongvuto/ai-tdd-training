import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

function runCli(storagePath: string, arguments_: string[]) {
  const tsxCliPath = resolve('node_modules', 'tsx', 'dist', 'cli.mjs');
  const projectCliPath = resolve('src', 'cli.ts');

  return spawnSync(process.execPath, [tsxCliPath, projectCliPath, ...arguments_], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      TICKETS_FILE: storagePath,
    },
  });
}

async function createEmptyTicketStore(prefix: string): Promise<string> {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), prefix));
  temporaryDirectories.push(temporaryDirectory);

  const storagePath = join(temporaryDirectory, 'tickets.json');
  await writeFile(storagePath, '[]', 'utf8');

  return storagePath;
}

describe('tickets CLI domain errors', () => {
  it('presents invalid create input as a concise CLI error', async () => {
    const storagePath = await createEmptyTicketStore('tickets-cli-error-');

    const result = runCli(storagePath, ['create', '--title', '   ']);

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    expect.soft(result.stderr).toContain('Invalid input');
    expect(JSON.parse(await readFile(storagePath, 'utf8'))).toEqual([]);
  });

  it('presents a missing ticket as a concise CLI error', async () => {
    const storagePath = await createEmptyTicketStore('tickets-cli-error-');

    const result = runCli(storagePath, ['show', 'missing-id']);

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('Ticket not found');
  });
});
