// app/sitemap.ts
import { MetadataRoute } from 'next'

export const revalidate = 86400; // 1 day in seconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrlAPI = 'https://api.propertyseller.com/api/v1';
    const baseUrlStatic = 'https://www.propertyseller.com';

    // Static routes
    const staticRoutes = ['/about', '/why-dubai'];

    // Fetch dynamic data
    //   const response = await fetch(`${baseUrlAPI}/projects`);
    //   console.log(response,'result')
    //   const result = await response.json();

    // console.log(result)
    //   const products = result?.data || [];

    //   const dynamicRoutes = products.map((product: any) => ({
    //     url: `${baseUrlAPI}/projects/${product.slug}`,
    //     lastModified: product.updatedAt || new Date().toISOString(),
    //   }));
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

        totalPages = result.pagination.totalPages;
        currentPage++;
    } while (currentPage <= totalPages);

    // Dynamic product URLs
    const dynamicRoutes = allProducts.map((product: any) => ({
        url: `${baseUrlAPI}/products/${product.slug}`,
        lastModified: product.updatedAt || new Date().toISOString(),
    }));

    return [
        ...staticRoutes.map((route) => ({
            url: `${baseUrlStatic}${route}`,
            lastModified: new Date().toISOString(),
        })),
        ...dynamicRoutes,
    ];
}
