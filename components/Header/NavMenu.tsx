import React from 'react';

interface MenuItem {
  name: string;
  link: string;
}

interface NavMenuProps {
  items: MenuItem[]; // Array of objects with name and link
}

const NavMenu: React.FC<NavMenuProps> = ({ items }) => {
  return (
    <nav className='max-w-[600px]'>
      <ul className='flex lg:flex-row flex-col gap-4  items-start laptop:items-center'>
        {items.map((item, index) => (
          <li className='font-medium font-poppins text-[12px]' key={index}>
            <a href={item.link}>{item.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
