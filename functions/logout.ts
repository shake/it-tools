import { generateLogoutURL } from '@cloudflare/pages-plugin-cloudflare-access/api';

const ACCESS_DOMAIN = 'https://it-tools-9zo.cloudflareaccess.com';

export const onRequest = () =>
  Response.redirect(generateLogoutURL({ domain: ACCESS_DOMAIN }), 302);
