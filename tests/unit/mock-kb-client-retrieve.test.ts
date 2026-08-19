import { describe, expect, it } from 'vitest';

import { MockKBClient } from '../../src/clients/mock-kb-client.js';
import { KBDocumentNotFoundError } from '../../src/errors/kb-document-not-found-error.js';

describe('MockKBClient retrieve', () => {
  it('returns the full seeded document for an exact ID', async () => {
    const client = new MockKBClient();

    const document = await client.retrieve('doc-001');

    expect(document).toEqual({
      id: 'doc-001',
      title: 'Customer Response Template',
      content: 'A reusable email template for customer requests.',
      nodePath: '/templates/email',
      tags: ['template', 'email', 'support'],
    });
  });

  it('throws a KB-specific not-found error for a missing ID', async () => {
    const client = new MockKBClient();

    await expect(client.retrieve('doc-999')).rejects.toThrow(
      KBDocumentNotFoundError,
    );
  });

  it('matches document IDs case-sensitively', async () => {
    const client = new MockKBClient();

    await expect(client.retrieve('DOC-001')).rejects.toThrow(
      KBDocumentNotFoundError,
    );
  });
});
