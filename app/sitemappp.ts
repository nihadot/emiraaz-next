import { MetadataRoute } from 'next'

export const revalidate = 86400; // 1 day in seconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrlAPI = 'https://v1-api.propertyseller.com/api/v1';
    const baseUrlStatic = 'https://www.propertyseller.com';

    // Static routes
    const staticRoutes = ['/about-property-seller', '/why-dubai',"/ai-agent","/allnews","/blogs","/cities","/developers","/featured-projects","/home","rental-income",
        "/terms",""
    ];


    const pageSize = 50; // Adjust if needed
    let currentPage = 1;
    let totalPages = 1;
    const allProducts: any[] = [];

    // Fetch all pages
    do {
        const res = await fetch(`${baseUrlAPI}/projects?page=${currentPage}&limit=${pageSize}`);
        const result = await res.json();

        if (!res.ok || !result?.data) break;

        allProducts.push(...result.data);

        // console.log(allProducts,'allProducts')

        totalPages = result.pagination.totalPages;
        currentPage++;
    } while (currentPage <= totalPages);

    // Dynamic product URLs
    const dynamicRoutes = allProducts.map((product: any) => ({
        url: `${baseUrlStatic}/projects/${product.slug}`,
        lastModified: product.updatedAt || new Date().toISOString(),
    }));

    const rootRoute = [{
        url: `${baseUrlStatic}/`,
        lastModified: new Date().toISOString(),
    }];

    return [
        ...rootRoute,
        ...staticRoutes.map((route) => ({
            url: `${baseUrlStatic}${route}`,
            lastModified: new Date().toISOString(),
        })),
        ...dynamicRoutes,
    ];
}
