import ProjectsUnderCity from '@/components/ProjectsUnderCity/ProjectsUnderCity'
import React, {  } from 'react'

interface PageProps {
  params: Promise<{ id: string }>;
}



export default async function Page({ params }: PageProps) {
  const { id } = await params; // Await the params Promise

  return <ProjectsUnderCity id={id} />;
}