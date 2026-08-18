import type { Document } from '../models/kb/document.js';
import type { SearchInput } from '../models/kb/search-input.js';
import type { SearchResult } from '../models/kb/search-result.js';
import type { KBClient } from './kb-client.js';

const documents: Document[] = [
  {
    id: 'doc-001',
    title: 'Customer Response Template',
    content: 'A reusable email template for customer requests.',
    nodePath: '/templates/email',
    tags: ['template', 'email'],
  },
];

export class MockKBClient implements KBClient {
  async search(input: SearchInput): Promise<SearchResult[]> {
    const normalizedQuery = input.query.toLowerCase();

    return documents
      .filter((document) =>
        document.title.toLowerCase().includes(normalizedQuery)
      )
      .map((document) => ({ document, matchType: 'title' }));
  }
}
