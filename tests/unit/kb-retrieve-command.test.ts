import { Command } from 'commander';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { KBClient } from '../../src/clients/kb-client.js';
import { registerKBCommand } from '../../src/commands/kb/kb-command.js';
import { KBDocumentNotFoundError } from '../../src/errors/kb-document-not-found-error.js';

function createClient(retrieve: KBClient['retrieve']): KBClient {
  return {
    search: async () => [],
    list: async () => [],
    retrieve,
    add: async () => {
      throw new Error('Unexpected add call');
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

describe('KB retrieve command', () => {
  it('delegates the positional document ID to the KB client once', async () => {
    const documentIds: string[] = [];
    const client = createClient(
      async (documentId) => {
        documentIds.push(documentId);
        return {
          id: 'doc-001',
          title: 'Customer Response Template',
          content: 'A reusable email template for customer requests.',
          nodePath: '/templates/email',
          tags: ['template', 'email', 'support'],
        };
      },
    );
    const program = createProgram(client);

    await program.parseAsync(['kb', 'retrieve', 'doc-001'], { from: 'user' });

    expect(documentIds).toEqual(['doc-001']);
  });

  it('prints every document field using labeled lines', async () => {
    const client = createClient(
      async () => ({
        id: 'doc-001',
        title: 'Customer Response Template',
        content: 'A reusable email template for customer requests.',
        nodePath: '/templates/email',
        tags: ['template', 'email', 'support'],
      }),
    );
    const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    const program = createProgram(client);

    await program.parseAsync(['kb', 'retrieve', 'doc-001'], { from: 'user' });

    expect(consoleLog.mock.calls).toEqual([
      ['ID: doc-001'],
      ['Title: Customer Response Template'],
      ['Content: A reusable email template for customer requests.'],
      ['Node Path: /templates/email'],
      ['Tags: template, email, support'],
    ]);
  });

  it('requires the positional document ID', async () => {
    const documentIds: string[] = [];
    const client = createClient(async (documentId) => {
      documentIds.push(documentId);
      throw new Error('Unexpected retrieve call');
    });
    const program = createProgram(client);

    await expect(
      program.parseAsync(['kb', 'retrieve'], { from: 'user' }),
    ).rejects.toMatchObject({ code: 'commander.missingArgument' });
    expect(documentIds).toEqual([]);
  });

  it('propagates the KB-specific not-found error', async () => {
    const client = createClient(async () => {
      throw new KBDocumentNotFoundError('KB document not found');
    });
    const program = createProgram(client);

    await expect(
      program.parseAsync(['kb', 'retrieve', 'doc-999'], { from: 'user' }),
    ).rejects.toThrow(KBDocumentNotFoundError);
  });
});
