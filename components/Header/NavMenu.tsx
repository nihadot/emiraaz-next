import clsx from 'clsx';
import React from 'react';

interface MenuItem {
  name: string;
  link: string;
}

interface NavMenuProps {
  items: MenuItem[]; // Array of objects with name and link
  linkItemClassName?: string; // Optional className for the link items
}

const NavMenu: React.FC<NavMenuProps> = ({ items,linkItemClassName }) => {
  return (
    <nav className={'max-w-[600px]'}>
      <ul className='flex lg:flex-row flex-col gap-[19px]  items-start laptop:items-center'>
        {items.map((item, index) => (
          <li className={clsx('font-medium text-black font-poppins text-[12px]',linkItemClassName)} key={index}>
            <a href={item.link}>{item.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
