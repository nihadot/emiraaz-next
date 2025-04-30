import {
    featured_red_icon,
    home_red_icon,
    notification_red_icon,
    profile_red_icon,
    saved_red_icon,
} from '@/app/assets'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
type NavItem = {
    icon: string
    label: string
    href: string
}

const navItems: NavItem[] = [
    { icon: home_red_icon, label: 'Home', href: '/home' },
    { icon: saved_red_icon, label: 'Saved', href: '/saved' },
    { icon: featured_red_icon, label: 'Featured', href: '/featured' },
    { icon: notification_red_icon, label: 'Alerts', href: '/alerts' },
    { icon: profile_red_icon, label: 'Profile', href: '/profile' },
]



const BottomNavItem = ({
    icon,
    label,
    href,
    isActive,
    onClick,
}: NavItem & { isActive: boolean; onClick: () => void }) => {
    const router = useRouter()

    const handleClick = () => {
        onClick()
        router.push(href)
    }

    return (
        <div
            onClick={handleClick}
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
        >
            <Image
                src={icon}
                alt={label}
                width={26}
                height={26}
                className="object-cover"
            />
            <p className={`text-xs mt-1 ${isActive ? 'text-[#FF1645]' : 'text-[#FF9999]'}`}>
                {label}
            </p>
        </div>
    )
}

function BottomNavigation() {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <section className="fixed bottom-0 left-0 right-0 bg-white h-20 z-50">
            <nav className="flex border-t border-[#DEDEDE] pt-3 h-16">
                {navItems.map((item, index) => (
                   <BottomNavItem
                   key={index}
                   icon={item.icon}
                   label={item.label}
                   href={item.href}
                   isActive={index === activeIndex}
                   onClick={() => setActiveIndex(index)}
               />
               
                ))}
            </nav>
        </section>
    )
}

export default BottomNavigation
