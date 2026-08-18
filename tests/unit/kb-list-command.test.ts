import { Command } from 'commander';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { KBClient } from '../../src/clients/kb-client.js';
import { registerKBCommand } from '../../src/commands/kb/kb-command.js';
import type { ListInput } from '../../src/models/kb/list-input.js';

function createClient(list: KBClient['list']): KBClient {
  return {
    search: async () => [],
    list,
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

afterEach(() => {
  vi.restoreAllMocks();
});

describe('KB list command', () => {
  it('delegates the parsed node path and numeric limit to the KB client once', async () => {
    const listInputs: ListInput[] = [];
    const client = createClient(
      async (input) => {
        listInputs.push(input);
        return [];
      },
    );
    const program = createProgram(client);

    await program.parseAsync(
      ['kb', 'list', '--node', '/templates/email', '--limit', '2'],
      { from: 'user' },
    );

    expect(listInputs).toEqual([
      {
        nodePath: '/templates/email',
        limit: 2,
      },
    ]);
  });

  it('prints returned document titles in client order', async () => {
    const client = createClient(
      async () => [
        {
          id: 'doc-001',
          title: 'Customer Response Template',
          content: 'A reusable email template for customer requests.',
          nodePath: '/templates/email',
          tags: ['template', 'email', 'support'],
        },
        {
          id: 'doc-002',
          title: 'Password Reset Template',
          content: 'Instructions for resetting a customer password.',
          nodePath: '/templates/email',
          tags: ['template', 'email', 'security'],
        },
      ],
    );
    const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    const program = createProgram(client);

    await program.parseAsync(
      ['kb', 'list', '--node', '/templates/email', '--limit', '2'],
      { from: 'user' },
    );

    expect(consoleLog.mock.calls).toEqual([
      ['Customer Response Template'],
      ['Password Reset Template'],
    ]);
  });

  it('prints nothing when the client returns no documents', async () => {
    const client = createClient(async () => []);
    const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    const program = createProgram(client);

    await program.parseAsync(
      ['kb', 'list', '--node', '/missing', '--limit', '2'],
      { from: 'user' },
    );

    expect(consoleLog).not.toHaveBeenCalled();
  });

  it.each([
    ['--node', ['kb', 'list', '--limit', '2']],
    ['--limit', ['kb', 'list', '--node', '/templates/email']],
  ])('requires the %s option', async (_option, arguments_) => {
    const listInputs: ListInput[] = [];
    const client = createClient(async (input) => {
      listInputs.push(input);
      return [];
    });
    const program = createProgram(client);

    await expect(
      program.parseAsync(arguments_, { from: 'user' }),
    ).rejects.toMatchObject({
      code: 'commander.missingMandatoryOptionValue',
    });
    expect(listInputs).toEqual([]);
  });
});
