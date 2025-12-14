"use client";

import Link from "next/link";
import { ContentCardProps } from "@/types/news/mobile/shared/shareContentCards/shareContentCards";

function ContentCard({
  image,
  category,
  title,
  description,
  date,
  href,
}: ContentCardProps) {
  return (
    <article className="flex items-center gap-3 bg-gray- rounded-2xl p-2.5 border border-gray-200 shadow-sm font-poppins">
      {/* Image */}
      <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 shrink-0 rounded-2xl overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        {/* Category */}
        <div className="flex gap-2 mb-1">
          <span className="px-1.5 py-1 text-xs bg-white text-gray-400 rounded border border-gray-300">
            {category}
          </span>
        </div>

        {/* Title */}
        <Link href={href||""}>
          <h2 className="text-sm font-semibold text-gray-900 leading-snug">
            {title}
          </h2>
        </Link>

        {/* Description */}
        {description && (
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {description}
          </p>
        )}

        {/* Date */}
        {date && <span className="mt-2 text-xs text-gray-400">{date}</span>}
      </div>
    </article>
  );
}

export default ContentCard;



// function ContentCard({
//   image,
//   category,
//   title,
//   description,
//   date,
//   href,
// }: ContentCardProps) {
//   return (
//     <article className="flex items-center gap-3 bg-white rounded-2xl p-2.5 border border-gray-200 shadow-sm font-poppins">
//       {/* Image */}
//       <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 shrink-0 rounded-2xl overflow-hidden">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Content */}
//       <div className="flex flex-col justify-center flex-1 min-w-0">
//         {/* Category */}
//         <span className="w-fit px-1.5 py-1 text-xs bg-white text-gray-400 rounded border border-gray-300 mb-1">
//           {category}
//         </span>

//         {/* Title */}
//         <Link href={href || ""}>
//           <h2 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
//             {title}
//           </h2>
//         </Link>

//         {/* Description */}
//         {description && (
//           <p className="text-xs text-gray-600 mt-1 line-clamp-2">
//             {description}
//           </p>
//         )}

//         {/* Date */}
//         {date && <span className="mt-2 text-xs text-gray-400">{date}</span>}
//       </div>
//     </article>
//   );
// }
// export default ContentCard;

