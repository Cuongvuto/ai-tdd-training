import { Command } from 'commander';
import { describe, expect, it } from 'vitest';

import type { KBClient } from '../../src/clients/kb-client.js';
import { registerKBCommand } from '../../src/commands/kb/kb-command.js';
import type { ListInput } from '../../src/models/kb/list-input.js';

describe('KB list command', () => {
  it('delegates the parsed node path and numeric limit to the KB client once', async () => {
    const listInputs: ListInput[] = [];
    const client: KBClient = {
      search: async () => [],
      list: async (input) => {
        listInputs.push(input);
        return [];
      },
    };
    const program = new Command()
      .name('tickets')
      .exitOverride()
      .configureOutput({ writeErr: () => {} });

    registerKBCommand(program, client);

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
});
