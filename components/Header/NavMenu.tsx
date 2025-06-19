'use client'
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

interface MenuItem {
  name: string;
  link: string;
}

interface NavMenuProps {
  items: MenuItem[]; // Array of objects with name and link
  linkItemClassName?: string; // Optional className for the link items
}

const NavMenuFunction: React.FC<NavMenuProps> = ({ items,linkItemClassName }) => {
   const searchParams = useSearchParams();
  const currency = searchParams.get('currency');
return (
    <nav className={'max-w-[600px]'}>
      <ul className='flex lg:flex-row flex-col gap-[19px]  items-start laptop:items-center'>
        {items.map((item, index) =>{
          
          const url = new URL(item.link, 'https://www.propertyseller.com');
          if (currency) {
            url.searchParams.set('currency', currency as string);
          }

          return(
          <li className={clsx('font-medium text-black font-poppins text-[12px]',linkItemClassName)} key={index}>
            <Link href={`${url.pathname}${url.search}`}>{item.name}</Link>
          </li>
        )})}
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
