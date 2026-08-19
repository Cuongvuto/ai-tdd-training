import { describe, expect, it } from 'vitest';

import { MockKBClient } from '../../src/clients/mock-kb-client.js';
import { KBDocumentNotFoundError } from '../../src/errors/kb-document-not-found-error.js';
import type { AddInput } from '../../src/models/kb/add-input.js';

function createAddInput(overrides: Partial<AddInput> = {}): AddInput {
  return {
    title: 'SMS Escalation Template',
    content: 'Escalation steps for urgent SMS support requests.',
    nodePath: '/templates/sms',
    tags: ['template', 'sms', 'support'],
    ...overrides,
  };
}

describe('MockKBClient add', () => {
  it('adds, returns, and stores a document in the client instance', async () => {
    const client = new MockKBClient();

    const document = await client.add(createAddInput());

    expect(document).toEqual({
      id: 'doc-004',
      title: 'SMS Escalation Template',
      content: 'Escalation steps for urgent SMS support requests.',
      nodePath: '/templates/sms',
      tags: ['template', 'sms', 'support'],
    });
    await expect(client.retrieve('doc-004')).resolves.toEqual(document);
  });

  it('generates sequential document IDs within one client instance', async () => {
    const client = new MockKBClient();

    const firstDocument = await client.add(createAddInput());
    const secondDocument = await client.add(createAddInput({
      title: 'SMS Closure Template',
      content: 'Closure steps for resolved SMS support requests.',
      tags: ['template', 'sms'],
    }));

    expect([firstDocument.id, secondDocument.id]).toEqual([
      'doc-004',
      'doc-005',
    ]);
  });

  it('makes an added document visible to search and list', async () => {
    const client = new MockKBClient();

    const document = await client.add(createAddInput());

    await expect(
      client.search({ query: 'SMS Escalation', topK: 10 }),
    ).resolves.toEqual([{ document, matchType: 'title' }]);
    await expect(
      client.list({ nodePath: '/templates/sms', limit: 10 }),
    ).resolves.toEqual([document]);
  });

  it('keeps added state and ID counters isolated per client instance', async () => {
    const firstClient = new MockKBClient();
    const secondClient = new MockKBClient();

    await firstClient.add(createAddInput());

    await expect(secondClient.retrieve('doc-004')).rejects.toThrow(
      KBDocumentNotFoundError,
    );
    await expect(
      secondClient.list({ nodePath: '/templates/sms', limit: 10 }),
    ).resolves.toEqual([]);
    await expect(secondClient.add(createAddInput())).resolves.toMatchObject({
      id: 'doc-004',
    });
  });

  it('allows duplicate document input', async () => {
    const client = new MockKBClient();
    const input = createAddInput();

    const firstDocument = await client.add(input);
    const secondDocument = await client.add(input);

    expect([firstDocument.id, secondDocument.id]).toEqual([
      'doc-004',
      'doc-005',
    ]);
  });
});
