import { Command } from 'commander';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { KBClient } from '../../src/clients/kb-client.js';
import { registerKBCommand } from '../../src/commands/kb/kb-command.js';
import type { SearchInput } from '../../src/models/kb/search-input.js';

function createClient(search: KBClient['search']): KBClient {
  return {
    search,
    list: async () => [],
    retrieve: async () => {
      throw new Error('Unexpected retrieve call');
    },
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

describe('KB search command', () => {
  it('delegates the positional query and numeric topK to the KB client once', async () => {
    const searchInputs: SearchInput[] = [];
    const client = createClient(
      async (input) => {
        searchInputs.push(input);
        return [];
      },
    );
    const program = createProgram(client);

    await program.parseAsync(
      ['kb', 'search', 'response', '--top-k', '3'],
      { from: 'user' },
    );

    expect(searchInputs).toEqual([
      {
        query: 'response',
        topK: 3,
      },
    ]);
  });

  it('prints result titles and match types in client order', async () => {
    const client = createClient(
      async () => [
        {
          document: {
            id: 'doc-001',
            title: 'Customer Response Template',
            content: 'A reusable email template for customer requests.',
            nodePath: '/templates/email',
            tags: ['template', 'email', 'support'],
          },
          matchType: 'title',
        },
        {
          document: {
            id: 'doc-002',
            title: 'Password Reset Template',
            content: 'Instructions for resetting a customer password.',
            nodePath: '/templates/email',
            tags: ['template', 'email', 'security'],
          },
          matchType: 'content',
        },
      ],
    );
    const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    const program = createProgram(client);

    await program.parseAsync(
      ['kb', 'search', 'template', '--top-k', '2'],
      { from: 'user' },
    );

    expect(consoleLog.mock.calls).toEqual([
      ['Customer Response Template [title]'],
      ['Password Reset Template [content]'],
    ]);
  });

  it('prints nothing when the client returns no results', async () => {
    const client = createClient(async () => []);
    const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    const program = createProgram(client);

    await program.parseAsync(
      ['kb', 'search', 'missing', '--top-k', '2'],
      { from: 'user' },
    );

    expect(consoleLog).not.toHaveBeenCalled();
  });

  it.each([
    [
      'query',
      ['kb', 'search', '--top-k', '3'],
      'commander.missingArgument',
    ],
    [
      '--top-k',
      ['kb', 'search', 'response'],
      'commander.missingMandatoryOptionValue',
    ],
  ])('requires the %s input', async (_input, arguments_, errorCode) => {
    const searchInputs: SearchInput[] = [];
    const client = createClient(async (input) => {
      searchInputs.push(input);
      return [];
    });
    const program = createProgram(client);

    await expect(
      program.parseAsync(arguments_, { from: 'user' }),
    ).rejects.toMatchObject({ code: errorCode });
    expect(searchInputs).toEqual([]);
  });
});
