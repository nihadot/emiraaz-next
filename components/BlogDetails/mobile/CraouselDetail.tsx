"use client";

import { Blog } from "@/types/blog/mobile/blogDetailsApitypes";

type Props = {
  blog?: Blog;
};

export default function MobileBlogHeroAndContent({ blog }: Props) {
  if (!blog) return null;

  return (
    <>
      {/* Hero Image */}
      <div className="relative w-full h-[280px] px-4 pt-4">
        <img
          src={blog?.image?.webp?.url || ""}
          alt={blog?.altText || blog?.blogTitle}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Content */}
      <section className="px-4 py-4">
        {/* Category */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span className="px-2 py-1 bg-gray-100 rounded">
            {blog?.blogCategoryDetails?.name}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold leading-snug mb-4">
          {blog?.blogTitle}
        </h2>

        {/* Blog Body */}
        <article
          className="space-y-4 text-sm text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: blog?.blogBody?.html||""
          }}
        />
      </section>
    </>
  );
}
