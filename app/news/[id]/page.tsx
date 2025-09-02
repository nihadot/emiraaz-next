import { baseUrl } from '@/api';
import NewsDetails from '@/components/NewsDetails/NewsDetails';
import { Metadata } from 'next';
import { use } from 'react';


interface PageProps {
  params: Promise<{ id: string }>;
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params; // Await the params Promise
  const res = await fetch(`${baseUrl}/news/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return {
      title: "News Not Found | Property Seller",
      description: "The news you're looking for doesn't exist.",
    };
  }

  const data = await res.json();

  return {
    title: data?.data?.metaTitle || `${data?.data?.newsTitle} | Property Seller`,
    description: data?.data?.metaDescription || data?.data?.newsBody?.slice(0, 150),
    alternates: {
      canonical: `https://www.propertyseller.com/news/${id}`,
    },
    keywords: data?.data?.metaKeywords,
    openGraph: {
      title: data?.data?.metaTitle || `${data?.data?.newsTitle} | Property Seller`,
      description: data?.data?.metaDescription || data?.data?.newsBody?.slice(0, 150),
      url: `https://www.propertyseller.com/news/${id}`,
      type: "website",
      images: [
        {
          url: data?.data?.image?.webp?.url,
          width: 1200,
          height: 630,
          alt: data?.data?.newsTitle,
        },
      ],
    },
    twitter: {
      title: data?.data?.metaTitle || `${data?.data?.newsTitle} | Property Seller`,
      description: data?.data?.metaDescription || data?.data?.newsBody?.slice(0, 150),
      card: "summary_large_image",
      images: [
        {
          url: data?.data?.image?.webp?.url,
          width: 1200,
          height: 630,
          alt: data?.data?.newsTitle,
        },
      ],
    },
  };
}

const News = ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = use(params);


    return (
        <NewsDetails
            id={id}
        />
    )
}

export default News