import { baseUrl } from "@/api";
import News from "@/components/News/News"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest News | Property Seller",
  description: "Stay up to date with the latest news and updates from Property Seller.",
  openGraph: {
    title: "Latest News | Property Seller",
    description: "Read the latest articles and updates in the real estate market.",
    url: "https://www.propertyseller.com/allnews",
    siteName: "Property Seller",
    images: [
      {
        url: "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png", // replace with your OG image
        width: 1200,
        height: 630,
        alt: "Property Seller News",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest News | Property Seller",
    description: "Stay up to date with the latest news and updates from Property Seller.",
    images: ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"], // same here
  },
};

export default async function AllNews() {
   const res = await fetch(`${baseUrl}/news?limit=24`);
    const data = await res.json();

    return (
        <News initialData={data.data} />
    )
}
