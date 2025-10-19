import { baseUrl } from '@/api';
import AgentVerification from '@/components/QrCodeVerification/QrCodeVerification';
import React from 'react'

interface PageProps {
  params: Promise<{ code: string }>;
}

async function page({ params }: PageProps) {

  const { code } = await params; // Await the params Promise

    // Fetch metadata with cache-busting timestamp to ensure fresh data
  const data = await fetch(
    `${baseUrl}/auth/agent/verifying`,
    {
      method: 'POST',
      body: JSON.stringify({
        agentId: code
      }),
      headers:{
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60 // Revalidate every 10 seconds
      },
    }
  ).then((res) => res.json())


  return (
    <AgentVerification
      id={code}
      // content={}
      // content={content}
      data={data?.data}
    />
    // <></>
  )
}

export default page