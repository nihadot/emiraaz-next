const config = {
  siteUrl: 'https://www.propertyseller.com',
  generateRobotsTxt: true,
  sitemapSize: 500000,
  generateIndexSitemap: false, // ⬅️ this is the key
  changefreq: 'daily',
  // priority: 0.7,
  additionalPaths: async () => {
    const allProducts = [];
    let currentPage = 1;
    const pageSize = 50;
    let totalPages = 1;
    const paths = [
      { loc: '/', lastmod: new Date().toISOString(), priority: 1 },
      { loc: '/buy', lastmod: new Date().toISOString(), priority: 0.9 }   // Buy

    ];

    do {
      const res = await fetch(`https://v1-api.propertyseller.com/api/v1/projects?page=${currentPage}&limit=${pageSize}`);
      const data = await res.json();
      allProducts.push(...data.data);
      totalPages = data.pagination.totalPages;
      currentPage++;
    } while (currentPage <= totalPages);

    return [...allProducts.map((product) => ({
      loc: `/projects/${product.slug}`,
      lastmod: product.updatedAt || new Date().toISOString(),
      priority: 0.7

    })), ...paths];

  },
  exclude: ['/edit-profile', '/forgot-password/*', "/login", "/otp-verification", "/profile/*", "/registration", "/saved-properties", "/otp", ""],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: ['https://www.propertyseller.com/sitemap.xml'],
    transformRobotsTxt: async (config, robotsTxt) => {
      // 🔥 Remove the Host section completely
      return robotsTxt.replace(/^# Host[\s\S]*?(?=# Sitemaps)/m, '');
    },
  },
};


export default config