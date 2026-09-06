import { spawnSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
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

function runCli(arguments_: string[]) {
  const tsxCliPath = resolve('node_modules', 'tsx', 'dist', 'cli.mjs');
  const projectCliPath = resolve('src', 'cli.ts');

  return spawnSync(process.execPath, [tsxCliPath, projectCliPath, ...arguments_], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: process.env,
  });
}

function outputLines(output: string): string[] {
  return output.trimEnd().split(/\r?\n/);
}

describe('tickets KB CLI', () => {
  it('searches seeded documents through the real CLI process', () => {
    const result = runCli(['kb', 'search', 'template', '--top-k', '2']);

    expect(result.error).toBeUndefined();
    expect(result.status, result.stderr).toBe(0);
    expect(outputLines(result.stdout)).toEqual([
      'Customer Response Template [title]',
      'Password Reset Template [title]',
    ]);
  });

  it('lists seeded documents through the real CLI process', () => {
    const result = runCli([
      'kb',
      'list',
      '--node',
      '/templates/email',
      '--limit',
      '2',
    ]);

    expect(result.error).toBeUndefined();
    expect(result.status, result.stderr).toBe(0);
    expect(outputLines(result.stdout)).toEqual([
      'Customer Response Template',
      'Password Reset Template',
    ]);
  });

  it('retrieves a seeded document through the real CLI process', () => {
    const result = runCli(['kb', 'retrieve', 'doc-001']);

    expect(result.error).toBeUndefined();
    expect(result.status, result.stderr).toBe(0);
    expect(outputLines(result.stdout)).toEqual([
      'ID: doc-001',
      'Title: Customer Response Template',
      'Content: A reusable email template for customer requests.',
      'Node Path: /templates/email',
      'Tags: template, email, support',
    ]);
  });

  it('adds a file-backed document through the real CLI process', async () => {
    const temporaryDirectory = await mkdtemp(join(tmpdir(), 'tickets-kb-add-'));
    temporaryDirectories.push(temporaryDirectory);
    const filePath = join(temporaryDirectory, 'new-template.md');
    await writeFile(
      filePath,
      'Send a short SMS response to the customer.',
      'utf8',
    );

    const result = runCli([
      'kb',
      'add',
      '--file',
      filePath,
      '--path',
      '/templates/sms',
      '--tags',
      'sms, support',
    ]);

    expect(result.error).toBeUndefined();
    expect(result.status, result.stderr).toBe(0);
    expect(outputLines(result.stdout)).toEqual([
      'ID: doc-004',
      'Title: new-template',
      'Content: Send a short SMS response to the customer.',
      'Node Path: /templates/sms',
      'Tags: sms, support',
    ]);
  });

  it('presents a missing KB document as a concise CLI error', () => {
    const result = runCli(['kb', 'retrieve', 'doc-999']);

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    expect(result.stderr.trim()).toBe('KB document not found');
  });

  it('presents an unreadable add file as a concise CLI error', async () => {
    const temporaryDirectory = await mkdtemp(join(tmpdir(), 'tickets-kb-add-'));
    temporaryDirectories.push(temporaryDirectory);
    const missingFilePath = join(temporaryDirectory, 'missing-template.md');

    const result = runCli([
      'kb',
      'add',
      '--file',
      missingFilePath,
      '--path',
      '/templates/sms',
      '--tags',
      'sms',
    ]);

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    expect(result.stderr.trim()).toBe('KB file error');
  });

  it.each([
    ['search', ['kb', 'search', '   ', '--top-k', '2']],
    ['list', ['kb', 'list', '--node', '   ', '--limit', '2']],
  ])(
    'presents invalid KB %s input through existing CLI validation handling',
    (_operation, arguments_) => {
      const result = runCli(arguments_);

      expect(result.error).toBeUndefined();
      expect(result.status).toBe(1);
      expect(result.stderr.trim()).toBe('Invalid input');
    },
  );

  it('keeps Week 2 and all nested KB commands visible in CLI help', () => {
    const rootHelp = runCli(['--help']);
    const kbHelp = runCli(['kb', '--help']);

    expect(rootHelp.error).toBeUndefined();
    expect(rootHelp.status, rootHelp.stderr).toBe(0);
    for (const command of ['create', 'list', 'show', 'update', 'kb']) {
      expect(rootHelp.stdout).toMatch(new RegExp(`^\\s+${command}\\b`, 'm'));
    }

    expect(kbHelp.error).toBeUndefined();
    expect(kbHelp.status, kbHelp.stderr).toBe(0);
    for (const command of ['search', 'list', 'retrieve', 'add']) {
      expect(kbHelp.stdout).toMatch(new RegExp(`^\\s+${command}\\b`, 'm'));
    }
  });

  it('uses fresh non-persistent mock state for each CLI process', async () => {
    const temporaryDirectory = await mkdtemp(join(tmpdir(), 'tickets-kb-add-'));
    temporaryDirectories.push(temporaryDirectory);
    const filePath = join(temporaryDirectory, 'new-template.md');
    await writeFile(filePath, 'Temporary SMS template.', 'utf8');

    const addResult = runCli([
      'kb',
      'add',
      '--file',
      filePath,
      '--path',
      '/templates/sms',
      '--tags',
      'sms',
    ]);
    const retrieveResult = runCli(['kb', 'retrieve', 'doc-004']);

    expect(addResult.status, addResult.stderr).toBe(0);
    expect(addResult.stdout).toContain('ID: doc-004');
    expect(retrieveResult.status).toBe(1);
    expect(retrieveResult.stderr.trim()).toBe('KB document not found');
  });
});
