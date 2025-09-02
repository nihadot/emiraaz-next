
import React from 'react'
import { baseUrl } from '@/api';
import HomePage from '@/components/Home/Home';

export default async function Page() {
  try {
    const res = await fetch(`${baseUrl}/projects?limit=24`);

    if (!res.ok) {
      throw new Error(`API returned ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return <HomePage initialData={data?.data} />;
  } catch (err) {
    console.error('Error fetching projects:', err);
    return <div>Failed to load projects.</div>;
  }
}
