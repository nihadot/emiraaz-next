import React from 'react'
import BlogDetails from '@/components/BlogDetails/BlogDetails';
import { baseUrl } from '@/api';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{ id: string }>;
}



export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params; // Await the params Promise
  const res = await fetch(`${baseUrl}/blogs/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return {
      title: "Blog Not Found | Property Seller",
      description: "The blog you're looking for doesn't exist.",
    };
  }

  const data = await res.json();

  return {
    title: data?.data?.metaTitle || `${data?.data?.blogTitle} | Property Seller`,
    description: data?.data?.metaDescription || data?.data?.blogBody?.slice(0, 150),
    alternates: {
      canonical: `https://www.propertyseller.com/news/${id}`,
    },
    keywords: data?.data?.metaKeywords,
    openGraph: {
      title: data?.data?.metaTitle || `${data?.data?.blogTitle} | Property Seller`,
      description: data?.data?.metaDescription || data?.data?.blogBody?.slice(0, 150),
      url: `https://www.propertyseller.com/news/${id}`,
      type: "website",
      images: [
        {
          url: data?.data?.image?.secure_url,
          width: 1200,
          height: 630,
          alt: data?.data?.blogTitle,
        },
      ],
    },
    twitter: {
      title: data?.data?.metaTitle || `${data?.data?.blogTitle} | Property Seller`,
      description: data?.data?.metaDescription || data?.data?.blogBody?.slice(0, 150),
      card: "summary_large_image",
      images: [
        {
          url: data?.data?.image?.secure_url,
          width: 1200,
          height: 630,
          alt: data?.data?.blogTitle,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {

    const { id } = await params; // Await the params Promise

    return (
        <BlogDetails id={id} />
    )
}
