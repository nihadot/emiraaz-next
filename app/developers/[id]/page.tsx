import ProjectsUnderDeveloper from '@/components/ProjectsUnderDeveloper/ProjectsUnderDeveloper';
import React, {  } from 'react'

interface PageProps {
  params: Promise<{ id: string }>;
}



export default async function Page({ params }: PageProps) {
  const { id } = await params; // Await the params Promise

  return <ProjectsUnderDeveloper id={id} />;
}