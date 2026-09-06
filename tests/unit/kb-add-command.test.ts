import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { Command } from 'commander';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { KBClient } from '../../src/clients/kb-client.js';
import { registerKBCommand } from '../../src/commands/kb/kb-command.js';
import { KBAddFileError } from '../../src/errors/kb-add-file-error.js';
import type { AddInput } from '../../src/models/kb/add-input.js';

const temporaryDirectories: string[] = [];

function createClient(add: KBClient['add']): KBClient {
  return {
    search: async () => [],
    list: async () => [],
    retrieve: async () => {
      throw new Error('Unexpected retrieve call');
    },
    add,
  };
}

function createProgram(client: KBClient): Command {
  const program = new Command()
    .name('tickets')
    .exitOverride()
    .configureOutput({ writeErr: () => {} });

  registerKBCommand(program, client);

  return program;
}

async function createTemporaryFile(
  fileName: string,
  content: string,
): Promise<string> {
  const directory = await mkdtemp(join(tmpdir(), 'kb-add-command-'));
  temporaryDirectories.push(directory);
  const filePath = join(directory, fileName);
  await writeFile(filePath, content, 'utf8');
  return filePath;
}

afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

describe('KB add command', () => {
  it('maps a UTF-8 file and CLI options to one KB client add call', async () => {
    const content = 'Send a short SMS response to the customer.\n';
    const filePath = await createTemporaryFile('new-template.md', content);
    const addInputs: AddInput[] = [];
    const client = createClient(async (input) => {
      addInputs.push(input);
      return {
        id: 'doc-004',
        ...input,
      };
    });
    const program = createProgram(client);

    await program.parseAsync(
      [
        'kb',
        'add',
        '--file',
        filePath,
        '--path',
        '/templates/sms',
        '--tags',
        'sms, support,,template',
      ],
      { from: 'user' },
    );

    expect(addInputs).toEqual([
      {
        title: 'new-template',
        content,
        nodePath: '/templates/sms',
        tags: ['sms', 'support', 'template'],
      },
    ]);
  });

  it('prints every added document field using labeled lines', async () => {
    const content = 'Send a short SMS response to the customer.\n';
    const filePath = await createTemporaryFile('new-template.md', content);
    const client = createClient(async (input) => ({
      id: 'doc-004',
      ...input,
    }));
    const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    const program = createProgram(client);

    await program.parseAsync(
      [
        'kb',
        'add',
        '--file',
        filePath,
        '--path',
        '/templates/sms',
        '--tags',
        'sms, support',
      ],
      { from: 'user' },
    );

    expect(consoleLog.mock.calls).toEqual([
      ['ID: doc-004'],
      ['Title: new-template'],
      [`Content: ${content}`],
      ['Node Path: /templates/sms'],
      ['Tags: sms, support'],
    ]);
  });

  it('translates a file-read failure to KBAddFileError', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'kb-add-command-'));
    temporaryDirectories.push(directory);
    const missingFilePath = join(directory, 'missing-template.md');
    const addInputs: AddInput[] = [];
    const client = createClient(async (input) => {
      addInputs.push(input);
      return {
        id: 'doc-004',
        ...input,
      };
    });
    const program = createProgram(client);

    await expect(
      program.parseAsync(
        [
          'kb',
          'add',
          '--file',
          missingFilePath,
          '--path',
          '/templates/sms',
          '--tags',
          'sms',
        ],
        { from: 'user' },
      ),
    ).rejects.toThrow(KBAddFileError);
    expect(addInputs).toEqual([]);
  });

  it.each(['--file', '--path', '--tags'])(
    'requires the %s option before delegation',
    async (missingOption) => {
      const filePath = await createTemporaryFile(
        'new-template.md',
        'Send a short SMS response to the customer.\n',
      );
      const addInputs: AddInput[] = [];
      const client = createClient(async (input) => {
        addInputs.push(input);
        return {
          id: 'doc-004',
          ...input,
        };
      });
      const program = createProgram(client);
      const arguments_ = [
        'kb',
        'add',
        '--file',
        filePath,
        '--path',
        '/templates/sms',
        '--tags',
        'sms, support',
      ];
      const optionIndex = arguments_.indexOf(missingOption);
      arguments_.splice(optionIndex, 2);

      await expect(
        program.parseAsync(arguments_, { from: 'user' }),
      ).rejects.toMatchObject({
        code: 'commander.missingMandatoryOptionValue',
      });
      expect(addInputs).toEqual([]);
    },
  );

  it('propagates an error from KBClient.add unchanged', async () => {
    const filePath = await createTemporaryFile(
      'new-template.md',
      'Send a short SMS response to the customer.\n',
    );
    const clientError = new Error('KB add failed');
    const client = createClient(async () => {
      throw clientError;
    });
    const program = createProgram(client);

    await expect(
      program.parseAsync(
        [
          'kb',
          'add',
          '--file',
          filePath,
          '--path',
          '/templates/sms',
          '--tags',
          'sms, support',
        ],
        { from: 'user' },
      ),
    ).rejects.toBe(clientError);
  });
});
