import { unstable_cache } from 'next/cache';
import { baseUrl } from '@/api';

/**
 * Cached API fetcher with automatic revalidation
 * Reduces redundant API calls across the application
 */
export const getCachedMetadata = unstable_cache(
    async () => {
        const response = await fetch(`${baseUrl}/meta-data?referencePage=home-page`, {
            next: { revalidate: 60 }
        });
        return response.json();
    },
    ['home-metadata'],
    {
        revalidate: 60,
        tags: ['metadata', 'home']
    }
);

export const getCachedEmirates = unstable_cache(
    async () => {
        const response = await fetch(`${baseUrl}/emirate/names`, {
            next: { revalidate: 300 }
        });
        return response.json();
    },
    ['emirates-list'],
    {
        revalidate: 300,
        tags: ['emirates']
    }
);

export const getCachedCities = unstable_cache(
    async () => {
        const response = await fetch(`${baseUrl}/city/names`, {
            next: { revalidate: 300 }
        });
        return response.json();
    },
    ['cities-list'],
    {
        revalidate: 300,
        tags: ['cities']
    }
);

export const getCachedCounts = unstable_cache(
    async () => {
        const response = await fetch(`${baseUrl}/news/all/counts`, {
            next: { revalidate: 120 }
        });
        return response.json();
    },
    ['all-counts'],
    {
        revalidate: 120,
        tags: ['counts']
    }
);

export const getCachedVideoAds = unstable_cache(
    async () => {
        const response = await fetch(`${baseUrl}/projects/small-video-ads`, {
            next: { revalidate: 600 }
        });
        return response.json();
    },
    ['video-ads'],
    {
        revalidate: 600,
        tags: ['video-ads']
    }
);

/**
 * Projects fetch - not cached via unstable_cache due to dynamic page param
 */
export async function getProjects(page?: number) {
    const response = await fetch(
        `${baseUrl}/projects?limit=24${page ? `&page=${page}` : ''}`,
        {
            next: { revalidate: 60 }
        }
    );
    return response.json();
}
