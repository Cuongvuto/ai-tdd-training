import type { AddInput } from '../models/kb/add-input.js';
import type { SearchInput } from '../models/kb/search-input.js';
import type { SearchResult } from '../models/kb/search-result.js';
import type { ListInput } from '../models/kb/list-input.js';
import type { Document } from '../models/kb/document.js';
export interface KBClient {
  search(input: SearchInput): Promise<SearchResult[]>;
  list(input: ListInput): Promise<Document[]>;
  retrieve(documentId: string): Promise<Document>;
  add(input: AddInput): Promise<Document>;
}
