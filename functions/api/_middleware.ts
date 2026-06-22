import cloudflareAccessPlugin from '@cloudflare/pages-plugin-cloudflare-access';

const ACCESS_DOMAIN = 'https://it-tools-9zo.cloudflareaccess.com';
const ACCESS_AUD = '13d5ba4d30a50a328018a03252fc3c874254f3fe49bcd90cce9afc80cedac485';

export const onRequest = cloudflareAccessPlugin({
  domain: ACCESS_DOMAIN,
  aud: ACCESS_AUD,
});
