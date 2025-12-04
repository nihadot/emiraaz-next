import Link from 'next/link'
import React from 'react'
import Header from '../Header'
import Image from 'next/image'
import { ps_logo } from '@/app/assets'

function TopHeader() {
    return (
        <Header
            logoSection={
                <Link
                    href={'/'}
                >
                    <Image src={ps_logo.src} alt="" width={140} height={50} className='object-contain h-full  max-w-[200px] w-full' />
                </Link>

            }
        />
    )
}

export default TopHeader