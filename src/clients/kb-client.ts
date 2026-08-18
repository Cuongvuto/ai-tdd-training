import type { SearchInput } from '../models/kb/search-input.js';
import type { SearchResult } from '../models/kb/search-result.js';

export interface KBClient {
  search(input: SearchInput): Promise<SearchResult[]>;
}
