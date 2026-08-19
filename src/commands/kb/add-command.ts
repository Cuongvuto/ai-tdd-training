import { readFile } from 'node:fs/promises';
import { parse } from 'node:path';

import type { Command } from 'commander';

import type { KBClient } from '../../clients/kb-client.js';
import { KBAddFileError } from '../../errors/kb-add-file-error.js';

interface KBAddCommandOptions {
  file: string;
  path: string;
  tags: string;
}

export function registerKBAddCommand(
  program: Command,
  client: KBClient,
): void {
  program
    .command('add')
    .requiredOption('--file <file>')
    .requiredOption('--path <nodePath>')
    .requiredOption('--tags <tags>')
    .action(async (options: KBAddCommandOptions) => {
      let content: string;

      try {
        content = await readFile(options.file, 'utf8');
      } catch (error) {
        throw new KBAddFileError(
          `Unable to read KB source file: ${options.file}`,
          { cause: error },
        );
      }

      const document = await client.add({
        title: parse(options.file).name,
        content,
        nodePath: options.path,
        tags: options.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      });

      console.log(`ID: ${document.id}`);
      console.log(`Title: ${document.title}`);
      console.log(`Content: ${document.content}`);
      console.log(`Node Path: ${document.nodePath}`);
      console.log(`Tags: ${document.tags.join(', ')}`);
    });
}
