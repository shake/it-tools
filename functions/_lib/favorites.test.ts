import { describe, expect, it } from 'vitest';
import { getAuthenticatedUserId } from './favorites';

describe('getAuthenticatedUserId', () => {
  it('prefers the Access JWT email payload when available', () => {
    const request = new Request('https://example.com', {
      headers: {
        'cf-access-authenticated-user-email': 'fallback@example.com',
      },
    });

    expect(getAuthenticatedUserId(request, {
      cloudflareAccess: {
        JWT: {
          payload: {
            email: 'Shake.Chen@gmail.com',
            aud: 'aud',
            exp: 0,
            iat: 0,
            iss: 'https://example.cloudflareaccess.com',
            sub: 'sub',
          },
          getIdentity: async () => undefined,
        },
      },
    } as any)).toBe('shake.chen@gmail.com');
  });

  it('falls back to the request header when plugin data is unavailable', () => {
    const request = new Request('https://example.com', {
      headers: {
        'cf-access-authenticated-user-email': 'Fallback@example.com',
      },
    });

    expect(getAuthenticatedUserId(request)).toBe('fallback@example.com');
  });
});
