import { baseUrl } from "@/api";
import HomePage from "@/components/Home/Home";

// export async function generateStaticParams() {
//   const res = await fetch(`${baseUrl}/projects?limit=24`);
//   const data = await res.json();

//   console.log(data,'Data')
//   return data?.data.map((project: any) => ({
//     slug: project.slug,
//   }));
// }


export default async function Page() {
    const res = await fetch(`${baseUrl}/projects?limit=24`);
    const data = await res.json();
    
    return <HomePage initialData={data.data} />;
}