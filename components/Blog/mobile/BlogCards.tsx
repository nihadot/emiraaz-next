// "use client";
// import React from "react";
// import Link from "next/link";
// import { ApiBlogItem } from "@/types/blog/mobile/blogCardsApitypes";
// import ContentCard from "@/components/shared/Mobile/cards/ContentCards";

// interface BlogCardsProps {
//   items: ApiBlogItem[];
// }

// const BlogCards: React.FC<BlogCardsProps> = ({ items }) => {
//   return (
//     <div className="min-h-screen bg-gray-50 pt-20 px-4 pb-8">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6 px-2">
//         Explore Blogs
//       </h1>

//       <div className="space-y-4">
//         {items.length > 0 ? (
//           items.map((data) => (
//             <article
//               key={data._id}
//               className="flex items-center gap-3 bg-gray-50 rounded-2xl p-2.5 border border-gray-200 shadow-sm"
//             >
//               {/* Image */}
//               <div className="w-40 h-40 shrink-0 rounded-2xl overflow-hidden">
//                 <img
//                   src={data.image?.webp?.url ?? ""}
//                   alt={data.blogTitle}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* Content */}
//               <div className="flex flex-col justify-center flex-1">
//                 {/* Category */}
//                 <div className="flex gap-2 mb-1">
//                   <span className="px-1.5 py-1 text-xs bg-white text-gray-400 rounded border border-gray-300">
//                     {data?.blogCategoryDetails?.name}
//                   </span>
//                 </div>

//                 {/* Title */}
//                 <Link href={`/blog/${data.slug}`}>
//                   <h2 className="text-sm font-semibold text-gray-900 leading-snug">
//                     {data.blogTitle}
//                   </h2>
//                 </Link>

//                 {/* Description */}
//                 <p className="text-xs text-gray-600 mt-1 line-clamp-3">
//                   {data?.blogBody?.text}
//                 </p>

//                 {/* Date */}
//                 <span className="mt-2 text-xs text-gray-400">{data?.date}</span>
//               </div>
//             </article>
//           ))
//         ) : (
//           <p className="text-sm text-gray-400">No blogs found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogCards;




"use client";

import ContentCard from "@/components/shared/Mobile/cards/ContentCards";
import { ApiBlogItem } from "@/types/blog/mobile/blogCardsApitypes";

interface BlogCardsProps {
  items: ApiBlogItem[];
}

const BlogCards = ({ items }: BlogCardsProps) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-4 px-4 pb-8 font-poppins">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 px-2">
        Explore Blogs
      </h1>

      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((blog) => (
            <ContentCard
              key={blog._id}
              image={blog.image?.webp?.url ?? ""}
              category={blog.blogCategoryDetails?.name ?? ""}
              title={blog.blogTitle}
              description={blog.blogBody?.text}
              date={blog.date}
              href={`/blog/${blog.slug}`}
            />
          ))
        ) : (
          <p className="text-sm text-gray-400">No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default BlogCards;

