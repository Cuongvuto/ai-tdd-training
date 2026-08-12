import { describe, expect, it } from 'vitest';

import { createTicket } from '../../src/services/ticket-service.js';

describe('createTicket', () => {
  it('trims a valid title and assigns the initial open status', () => {
    const ticket = createTicket({ title: '  Fix login  ' });

    expect(ticket.title).toBe('Fix login');
    expect(ticket.status).toBe('open');
  });

  it('rejects a whitespace-only title', () => {
    expect(() => createTicket({ title: '   ' })).toThrow();
  });

  it('trims a provided description', () => {
    const ticket = createTicket({
      title: 'Fix login',
      description: '  Login button does not work  ',
    });

    expect(ticket.description).toBe('Login button does not work');
  });

  it('defaults an omitted description to an empty string', () => {
    const ticket = createTicket({ title: 'Fix login' });

    expect(ticket.description).toBe('');
  });

  it('defaults an omitted priority to medium', () => {
    const ticket = createTicket({ title: 'Fix login' });

    expect(ticket.priority).toBe('medium');
  });

  it('normalizes a provided priority', () => {
    const ticket = createTicket({
      title: 'Fix login',
      priority: ' HIGH ',
    });

    expect(ticket.priority).toBe('high');
  });

  it('rejects an invalid priority', () => {
    expect(() =>
      createTicket({ title: 'Fix login', priority: 'urgent' }),
    ).toThrow();
  });

  it('defaults omitted tags to an empty array', () => {
    const ticket = createTicket({ title: 'Fix login' });

    expect(ticket.tags).toEqual([]);
  });

  it('normalizes provided tags', () => {
    const ticket = createTicket({
      title: 'Fix login',
      tags: [' Bug ', 'AUTH'],
    });

    expect(ticket.tags).toEqual(['bug', 'auth']);
  });

  it('removes tags that are empty after trimming', () => {
    const ticket = createTicket({
      title: 'Fix login',
      tags: ['bug', '   ', 'auth'],
    });

    expect(ticket.tags).toEqual(['bug', 'auth']);
  });

  it('removes duplicate normalized tags', () => {
    const ticket = createTicket({
      title: 'Fix login',
      tags: ['bug', 'auth', 'BUG'],
    });

    expect(ticket.tags).toEqual(['bug', 'auth']);
  });

  it('assigns a UUID ID to a newly created ticket', () => {
    const ticket = createTicket({ title: 'Fix login' });

    expect(ticket.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });
});
