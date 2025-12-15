"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export interface PropertyCardItem {
    id: string;
    image: string;
    propertyTypes: string;
    type: string;
    title: string;
    location: string;
    beds: number;
    squareFeet: string;
    totalFloors: string;
    baths: number;
    area: string;
    price: string;
    slug: string;
}

export function usePropertyCards(items: PropertyCardItem[]) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const searchParams = useSearchParams();

    const router = useRouter();


    const onCardClick = (id: string) => {
        setActiveId(id);

        const currency = searchParams.get('currency');
        const slug = id
        // console.log(slug,'slug')
        const queryString = currency ? `?currency=${currency}` : '';

        // Prefetch the page in the background
        router.prefetch(`/projects/${slug}${queryString}`);
        router.push(`/projects/${slug}${queryString}`);

    };

    return {
        cards: items,
        activeId,
        onCardClick,
    };
}
