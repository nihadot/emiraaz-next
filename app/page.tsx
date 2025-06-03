
import React from 'react'
import { baseUrl } from '@/api';
import HomePage from '@/components/Home/Home';

export default async function Page() {
  const res = await fetch(`${baseUrl}/projects?limit=24`);
  const data = await res?.json();
  return <HomePage initialData={data?.data} />;
}