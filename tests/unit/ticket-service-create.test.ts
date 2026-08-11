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
});
