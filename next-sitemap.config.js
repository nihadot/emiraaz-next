const config = {
  siteUrl: 'https://www.propertyseller.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  additionalPaths: async () => {
    const allProducts = [];
    let currentPage = 1;
    const pageSize = 50;
    let totalPages = 1;

    do {
      const res = await fetch(`https://v1-api.propertyseller.com/api/v1/projects?page=${currentPage}&limit=${pageSize}`);
      const data = await res.json();
      allProducts.push(...data.data);
      totalPages = data.pagination.totalPages;
      currentPage++;
    } while (currentPage <= totalPages);

    return allProducts.map((product) => ({
      loc: `/projects/${product.slug}`,
      lastmod: product.updatedAt || new Date().toISOString(),
    }));
  },
  exclude: ['/edit-profile', '/forgot-password/*', "/login", "/otp-verification", "/profile/*", "/registration", "/saved-properties", "/otp", ""],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.propertyseller.com/sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};


export default config