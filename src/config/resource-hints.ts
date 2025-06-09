export const resourceHints = {
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://analytics.google.com',
  ],
  dnsPrefetch: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com',
  ],
  preload: [
    {
      href: '/fonts/custom-font.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
  ],
};

export const thirdPartyScripts = [
  {
    src: 'https://www.googletagmanager.com/gtag/js',
    async: true,
    defer: false,
    'data-id': 'G-XXXXXXXX', // Tu ID de GA4
  },
  {
    src: 'https://cdn.jsdelivr.net/npm/chart.js',
    async: true,
    defer: true,
  },
]; 