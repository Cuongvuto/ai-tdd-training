import { describe, expect, it } from 'vitest';
import { ValidationError } from '../../src/errors/validation-error.js';
import { MockKBClient } from '../../src/clients/mock-kb-client.js';

describe('MockKBClient search', () => {
  it('returns a seeded document whose title contains the query case-insensitively', async () => {
    const client = new MockKBClient();

    const results = await client.search({ query: 'rEsPoNsE', topK: 5 });

    expect(results).toEqual([
      {
        document: {
          id: 'doc-001',
          title: 'Customer Response Template',
          content: 'A reusable email template for customer requests.',
          nodePath: '/templates/email',
          tags: ['template', 'email','support'],
        },
        matchType: 'title',
      },
    ]);
  });

  it('returns a content match case-insensitively' , async() =>{
    const client = new MockKBClient();

    const results = await client.search({
      query: 'rEusAbLe',
      topK: 5,
    })

    expect(results).toHaveLength(1);
    expect(results[0]?.document.id).toBe('doc-001');
    expect(results[0]?.matchType).toBe('content');

  });

  it('return a tag match case-insensitively' , async()=>{
    const client = new MockKBClient();

    const results = await client.search({
      query : 'SuPpOrT',
      topK: 5,
    });

    expect(results).toHaveLength(1);
    expect(results[0]?.document.id).toBe('doc-001');
    expect(results[0]?.matchType).toBe('tag');

  });

  it('preserves insertion order and limits results by topK', async()=>{
    const client = new MockKBClient();

    const result = await  client.search({
      query: 'template',
      topK: 1,
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.document.id).toBe('doc-001');
  });

  it ('reject a blank search query', async()=>{
    const client = new MockKBClient();

    await expect(
      client.search({
        query: ' ',
        topK: 5,
      })
    ).rejects.toThrow(ValidationError);
  });

  it ('rejects topK when it is zero', async () => {
    const client = new MockKBClient();

    await expect(
      client.search({
        query: 'template',
        topK: 0,
     })
    ).rejects.toThrow(ValidationError);
  });
  it ('rejects a negative topK', async () => {
    const client = new MockKBClient();

    await expect(
      client.search({
      query: 'template',
      topK: -1,
    })
   ).rejects.toThrow(ValidationError);
  });
  it ('rejects a non-integer topK', async () => {
    const client = new MockKBClient();

    await expect(
      client.search({
      query: 'template',
      topK: 1.5,
    })
   ).rejects.toThrow(ValidationError);
 });
 
});
