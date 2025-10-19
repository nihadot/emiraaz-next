import React, { useState } from 'react'
import Container from '../atom/Container/Container'
import clsx from 'clsx'

function HomePageContent({
  display,
  content,
}: {
  display: boolean,
  content: any
}) {
  const [expanded, setExpanded] = useState(false);
  const maxChars = 1650; // adjust initial visible length

  // Strip HTML tags for initial preview
  const textOnly = content?.html;
  const preview = textOnly.slice(0, maxChars);

  return (
    <Container className={clsx('mt-12', display ? 'absolute -left-[9999999px]' : '')}>
      {/* <div
        className='prose prose-sm content-wrapper max-w-none font-poppins'
        dangerouslySetInnerHTML={{ __html: content?.html }}
      ></div> */}
      <div className='prose prose-sm content-wrapper-home max-w-none font-poppins'>
        {expanded ? (
          <div dangerouslySetInnerHTML={{ __html: content?.html }} />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: preview }}
          ></div>
        )}
      </div>

      {textOnly.length > maxChars && (
        <button
          onClick={() => setExpanded(!expanded)}
          className='text-black text-xs font-medium cursor-pointer mt-2'
        >
          {expanded ? 'Read less' : 'Read more...'}
        </button>
      )}

    </Container>
  )
}

export default HomePageContent

function H3({ content, className }: { content: string, className?: string }) {
  return (
    <h3 className={clsx('text-[14px] leading-relaxed font-normal font-poppins pb-4', className)}>
      {content}
    </h3>
  )
}






// 

//  <header>
//         <h1 className='text-[22px] pb-[8px] font-medium font-poppins'>
//           PropertySeller Dubai – Trusted Real Estate Partner in UAE
//         </h1>
//         <p className='sr-only'>
//           Dubai’s real estate market is full of opportunity and PropertySeller is built to help you make the most of it. Designed to simplify the process, Propertyseller brings together verified listings, exclusive inventory, and real-time market insights, empowering both buyers and sellers with a seamless, tech-enabled experience backed by expert support at every step.
//         </p>
//       </header>

//       <section>
//         {/* <H3 content='Dubai’s real estate market is full of opportunity and PropertySeller is built to help you make the most of it. Designed to simplify the process, PropertySeller brings together verified listings, exclusive inventory, and real-time market insights, empowering both buyers and sellers with a seamless, tech-enabled experience backed by expert support at every step.' /> */}
//         <H3 content='To avoid what has been often overlooked in the traditional classified portals, Propertyseller has taken great care to bring full authority over its inventory - to avoid duplicate listings - hence pricing confusion, and to bring absolute transparency to the process. Maintenance of privacy is also our top priority.' />
//       </section>

//       <section>
//         <h2 className='text-[20px] pb-[6px] font-medium font-poppins'>
//           From Off-Plan to Resale: Discover More with PropertySeller
//         </h2>
//         <H3 content='PropertySeller is a full-service real estate company. We work hand-in-hand with top developers and trusted property owners across Dubai and UAE, building exclusive partnerships that give our users access to pre-launch deals, early investment opportunities, and insider listings rarely found elsewhere.' />
//         <H3
//           className='!mb-0 !pb-1'
//           content='Whether you’re a first-time buyer looking for a new apartment, an investor eyeing long-term growth, or a seller aiming for quick and efficient transactions and scrolling through off-plan projects, off-plan resale, secondary properties or land, you’ll find only the most reliable options on PropertySeller.' />


//         <H3
//           className='!mb-0 !pb-1'
//           content='Propertyseller will soon turn to your go-to solution. Our platform is designed to give you the clarity, speed, and support  to invest with full confidence.' />

//         {expanded && (
//           <>
//             <h2 className='text-[20px] pt-[6px] pb-[16px] font-medium font-poppins'>
//               Make your searches easy as you go with the Propertyseller App
//             </h2>
//             <H3 content='We always knew, finding the perfect home or investment is about dreams, possibilities, numbers that give results and a stress free experience. Hence, The PropertySeller App is crafted for discerning buyers and investors who value time, exclusivity, and effortless access to the city’s most sought-after properties. With refined navigation, smart filters, and verified listings, your search becomes a curated experience, not a chore. Whether at home, in your office, or flying across the globe, the PropertySeller App ensures Dubai’s finest real estate is always within reach.' />

//             <h2 className='text-[20px] pb-[6px] font-medium font-poppins'>
//               PropertySeller’s Exclusive Access to Premium Real Estate Deals
//             </h2>

//             <H3
//               content='PropertySeller thrives on strategic alliances with leading developers and trusted property owners throughout Dubai and the broader UAE. These exclusive partnerships unlock a world of opportunities. From off-plan launches and early-stage investment options to hidden resale gems - that is hard to find on typical real estate portals. This means PropertySeller users benefit from a curated selection of premium, high-potential properties, positioned for growth and profitability.'
//             />


//             <h2 className='text-[20px] pb-[6px] font-medium font-poppins'>
//               How PropertySeller Ensures Verified Listings and Pricing Clarity
//             </h2>

//             <H3
//               content='At the heart of PropertySeller’s mission is a commitment to transparency and trust. Every listing is carefully verified and governed under a strict authority framework. This eliminates duplicate entries, clarifies pricing, and ensures you’re always viewing legitimate, up-to-date offers. PropertySeller is your confide in providing a clean, accurate marketplace where you can search with confidence.'
//             />

//             <h2 className='text-[20px] pb-[6px] font-medium font-poppins'>
//               Seamless Property Journeys with PropertySeller’s Smart Tools and Expert Support
//             </h2>

//             <H3
//               content='Designed to deliver clarity, speed, and a stress-reduced experience, PropertySeller’s platform and upcoming app are built for smart investors and buyers who value precision and ease. Featuring intuitive navigation, powerful filters, and real-time market insights, the experience is both seamless and sophisticated. Plus, expert transaction support is available at every turn, ensuring your journey from browsing to closing at Propertyseller is backed by professionals who work for your best interests.'
//             />

//             <h2 className='text-[20px] pb-[6px] font-medium font-poppins'>
//               PropertySeller Community of Smart Buyers & Investors
//             </h2>

//             <H3
//             className='!mb-0 !pb-1'
//               content='Join a growing community of informed investors and smart buyers who are changing the way Dubai real estate works. Experience what it means to buy and sell with purpose - with PropertySeller by your side.'
//             />
//           </>
//         )}

//         <button
//           onClick={() => setExpanded(!expanded)}
//           className='text-black inline cursor-pointer text-xs font-medium '
//           aria-expanded={expanded}
//           aria-controls='more-content'
//         >
//           {expanded ? 'Read less' : 'Read more...'}
//         </button>

//       </section>