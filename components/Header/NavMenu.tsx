'use client'
import clsx from 'clsx';
import { Info } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"

interface MenuItem {
  name: string;
  link: string;
}

interface NavMenuProps {
  items: MenuItem[]; // Array of objects with name and link
  linkItemClassName?: string; // Optional className for the link items
}

const NavMenuFunction: React.FC<NavMenuProps> = ({ items, linkItemClassName }) => {
  const searchParams = useSearchParams();
  const currency = searchParams.get('currency');
  const pathname = usePathname()
  const [hovered, setHovered] = useState(false)

// console.log(hovered,'hovered')

  return (
    <nav className={'max-w-[600px]'}>
      <ul className='flex rle lg:flex-row flex-col gap-[19px]  items-start laptop:items-center'>
        {pathname === "/" && <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className='flex relative gap-2  items-center'>
          <Info
            size={16}
          />
          <p className='font-medium text-black font-poppins text-[12px]'>Beta</p>

            {/* Only render on hover */}
            <AnimatePresence>
              {hovered && <BetaVersionNotice />}
            </AnimatePresence>
        </div>}

        {items.map((item, index) => {

          const url = new URL(item.link, 'https://www.propertyseller.com');
          if (currency) {
            url.searchParams.set('currency', currency as string);
          }

          return (
            <li className={clsx('font-medium text-black font-poppins text-[12px]', linkItemClassName)} key={index}>
              <Link href={`${url.pathname}${url.search}`}>{item.name}</Link>
            </li>
          )
        })}

      </ul>


    </nav>
  );
};

function NavMenu(props: NavMenuProps) {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <NavMenuFunction {...props} />
    </Suspense>
  )
}
export default NavMenu;





function BetaVersionNotice() {
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="absolute -left-10 top-5 z-50 bg-[#FF1645] text-white  rounded-md px-[20px] py-[14px] w-[390px]"
    >

<div className="flex gap-2 items-center">
<Info
size={16}
/>
      <p className='text-xs font-medium font-poppins py-2 text-white'>Beta Version Notice</p>
</div>
      <div className="font-normal text-white flex flex-col gap-3 leading-[22px]  font-poppins text-[12px]">
        <p>Welcome to PropertySeller. </p>

        <p>Please note that this is our beta version, and we are continuously improving our listings, features, and legal compliance. While we strive for accuracy, there may be occasional errors, outdated information, or missing details.</p>

        <p>We are actively working to fix issues, update listings, and ensure all information meets legal standards. We apologize in advance for any inconvenience and appreciate your understanding as we enhance the platform.</p>

     <p>Thank you for helping us build a trusted and reliable property platform!</p>
      </div>
    </motion.div>
  )
}