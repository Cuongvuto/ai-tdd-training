import { describe, expect, it } from 'vitest';

import { MockKBClient } from '../../src/clients/mock-kb-client.js';

describe('MockKBClient search', () => {
  it('returns a seeded document whose title contains the query case-insensitively', async () => {
    const client = new MockKBClient();

    const results = await client.search({ query: 'rEsPoNsE' });

    expect(results).toEqual([
      {
        document: {
          id: 'doc-001',
          title: 'Customer Response Template',
          content: 'A reusable email template for customer requests.',
          nodePath: '/templates/email',
          tags: ['template', 'email'],
        },
        matchType: 'title',
      },
    ]);
  });

  it('returns a content match case-insensitively' , async() =>{
    const client = new MockKBClient();

    const results = await client.search({
      query: 'rEusAbLe',
    })

    expect(results).toHaveLength(1);
    expect(results[0]?.document.id).toBe('doc-001');
    expect(results[0]?.matchType).toBe('content');

  })

});
