import { usePathname } from 'next/navigation';
import React from 'react'

const PageContentSection = () => {

  const pathname = usePathname();
  const segments = pathname.split("/site-index/")[1]?.split("/") || [];
  const firstSegment = segments[0] || "";
  const secondSegment = segments[1] || "";


  return (
    <section>



      <h1
        className='text-2xl pt-2 font-medium font-poppins text-black'
      >
        For buy properties sitemap in{" "}
        <span>
          {secondSegment
            .replace(/-/g, " ")
            .toLowerCase()
            .replace(/^\w/, c => c.toUpperCase())}
        </span>
      </h1>
    </section>
  )
}

export default PageContentSection