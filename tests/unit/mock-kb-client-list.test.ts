import { describe, expect, it } from 'vitest';
import { MockKBClient } from '../../src/clients/mock-kb-client.js';

describe('MockKBClient list', ()=>{
    it('returns documents for the exact nodePath in insertion order' , async()=>{

        const client = new MockKBClient;

        const result = await client.list({
            nodePath: '/templates/email',
        });

        expect(result.map((document) => document.id)).toEqual([
            'doc-001',
            'doc-002',
        ]);
    })
})