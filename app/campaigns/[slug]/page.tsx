import React from 'react'
import CampaignPage from '@/components/CampaignPage/Campaign'

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
    const {slug } = await params; // Await the params Promise

    return (
        <CampaignPage slug={slug} />
    )
}
