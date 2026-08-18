import { ValidationError } from '../errors/validation-error.js';
import type { Document } from '../models/kb/document.js';
import type { SearchInput } from '../models/kb/search-input.js';
import type { SearchResult } from '../models/kb/search-result.js';
import type { ListInput } from '../models/kb/list-input.js'; 
import type { KBClient } from './kb-client.js';

const documents: Document[] = [
  {
    id: 'doc-001',
    title: 'Customer Response Template',
    content: 'A reusable email template for customer requests.',
    nodePath: '/templates/email',
    tags: ['template', 'email', 'support'],
  },
  {
    id: 'doc-002',
    title: 'Password Reset Template',
    content: 'Instructions for resetting a customer password.',
    nodePath: '/templates/email',
    tags: ['template', 'email', 'security'],
 },
  {
    id: 'doc-003',
    title: 'DevOps Team Contacts',
    content: 'On-call contact information for the DevOps team.',
    nodePath: '/team/devops',
    tags: ['team', 'devops'],
 },
];

export class MockKBClient implements KBClient {
  async search(input: SearchInput): Promise<SearchResult[]>{
    const normalizedQuery = input.query.trim().toLowerCase();

    if (!normalizedQuery) {
      throw new ValidationError('Search query must not be blank');
    }

    if (!Number.isInteger(input.topK) || input.topK <= 0) {
      throw new ValidationError('topK must be a positive integer');
   }

    const results: SearchResult[] = [];

    for(const document of documents){
      const titleMatches = document.title
        .toLowerCase()
        .includes(normalizedQuery);
      
      const contentMatches = document.content
        .toLowerCase()
        .includes(normalizedQuery);
      
      const tagMatches = document.tags.some((tag)=>
         tag.toLowerCase()
         .includes(normalizedQuery));

      if(titleMatches){
        results.push({
          document,
          matchType: 'title',
        }); 
      }else if(contentMatches){
        results.push({
          document,
          matchType: 'content',
        });
      }else if(tagMatches){
        results.push({
          document,
          matchType: 'tag',
        });
      }
    }

    return results.slice(0, input.topK);
  }
  async list(input: ListInput): Promise<Document[]> {
    const normalizedNodePath = input.nodePath.trim();
    if(!normalizedNodePath){
      throw new ValidationError('nodePath must not be blank');
    }
    if (!Number.isInteger(input.limit) || input.limit <= 0) {
      throw new ValidationError('limit must be a positive integer');
    }
    return documents.filter(
      (document) => document.nodePath === normalizedNodePath
    )
    .slice(0,input.limit);
  }
}
