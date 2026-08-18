import type { Document } from './document.js';

export type SearchMatchType = 'title' | 'content' | 'tag';

export interface SearchResult {
  document: Document;
  matchType: SearchMatchType;
}
