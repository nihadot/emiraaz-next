import { Metadata } from "next";
import ProjectDetails from "@/components/ProjectDetails/ProjectDetails";
import { baseUrl } from "@/api";

interface PageProps {
  params: Promise<{ id: string }>;
}


// ✅ Static Paths for Pre-rendering (e.g., top 10 projects)
export async function generateStaticParams() {
  const res = await fetch(`${baseUrl}/projects?limit=200`);
  const data = await res.json();

  return data.data.map((project: any) => ({
    id: project.slug,
  }));
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params; // Await the params Promise
  const res = await fetch(`${baseUrl}/projects/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return {
      title: "Project Not Found | Property Seller",
      description: "The project you're looking for doesn't exist.",
    };
  }

  const data = await res.json();

  return {
    title: data?.data?.metaTitle || `${data?.data?.projectTitle} | Property Seller`,
    description: data?.data?.metaDescription || data?.data?.description?.slice(0, 150),
    alternates: {
      canonical: `https://www.propertyseller.com/projects/${id}`,
    },
    keywords: data?.data?.metaKeywords,
    openGraph: {
      title: data?.data?.metaTitle || `${data?.data?.projectTitle} | Property Seller`,
      description: data?.data?.metaDescription || data?.data?.description?.slice(0, 150),
      url: `https://www.propertyseller.com/projects/${id}`,
      type: "website",
      images: [
        {
          url: data?.data?.mainImages?.[0]?.secure_url,
          width: 1200,
          height: 630,
          alt: data?.data?.projectTitle,
        },
      ],
    },
    twitter: {
      title: data?.data?.metaTitle || `${data?.data?.projectTitle} | Property Seller`,
      description: data?.data?.metaDescription || data?.data?.description?.slice(0, 150),
      card: "summary_large_image",
      images: [
        {
          url: data?.data?.mainImages?.[0]?.secure_url,
          width: 1200,
          height: 630,
          alt: data?.data?.projectTitle,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params; // Await the params Promise

  return <ProjectDetails id={id} />;
}