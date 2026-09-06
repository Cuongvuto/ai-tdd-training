import { describe, expect, it } from 'vitest';
import { MockKBClient } from '../../src/clients/mock-kb-client.js';
import { ValidationError } from '../../src/errors/validation-error.js';

describe('MockKBClient list', ()=>{
    it('returns documents for the exact nodePath in insertion order' , async()=>{

        const client = new MockKBClient;

        const result = await client.list({
            nodePath: '/templates/email',
            limit: 10,
        });

        expect(result.map((document) => document.id)).toEqual([
            'doc-001',
            'doc-002',
        ]);
    });

    it ('limits list results while preserving insertion order', async()=>{
        const client = new MockKBClient();

        const result = await client.list({
            nodePath : '/templates/email',
            limit : 1,
        });

        expect (result).toHaveLength(1);
        expect(result[0]?.id).toBe('doc-001');
    });
    it ('rejects a blank nodePath' , async()=>{
        const client = new MockKBClient();

        const result = await expect(client.list({
            nodePath : ' ',
            limit: 10,
        })
    ).rejects.toThrow(ValidationError);
    });

    it ('reject limit when it is zero' , async()=>{
        const client = new MockKBClient();

        await expect(client.list({
            nodePath: '/templates/email',
            limit: 0,
        })
    ).rejects.toThrow(ValidationError);
    });
    
    it ('reject  a negative limit' , async()=>{
        const client = new MockKBClient();

        await expect(client.list({
            nodePath: '/templates/email',
            limit: -1,
        })
    ).rejects.toThrow(ValidationError);
    });

    it ('reject a non-integer limit' , async()=>{
        const client = new MockKBClient();

        await expect(client.list({
            nodePath: '/templates/email',
            limit: 1.5,
        })
    ).rejects.toThrow(ValidationError);
    });

});