import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: 'Googlebot', disallow: '' },
      { userAgent: 'googlebot-image', disallow: '' },
      { userAgent: 'googlebot-mobile', disallow: '' },
      { userAgent: 'MSNBot', disallow: '' },
      { userAgent: 'Slurp', disallow: '' },
      { userAgent: 'Teoma', disallow: '' },
      { userAgent: 'Gigabot', disallow: '' },
      { userAgent: 'Robozilla', disallow: '' },
      { userAgent: 'Nutch', disallow: '' },
      { userAgent: 'ia_archiver', disallow: '' },
      { userAgent: 'baiduspider', disallow: '' },
      { userAgent: 'naverbot', disallow: '' },
      { userAgent: 'yeti', disallow: '' },
      { userAgent: 'yahoo-mmcrawler', disallow: '' },
      { userAgent: 'psbot', disallow: '' },
      { userAgent: 'yahoo-blogs/v3.9', disallow: '' },
      { userAgent: '*', disallow: ['/cgi-bin/'], crawlDelay: 5 },
    ],
    sitemap: 'https://www.propertyseller.com/sitemap.xml',
  }
}
