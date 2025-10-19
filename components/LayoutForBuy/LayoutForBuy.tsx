import React from 'react'
import { ReactNode } from "react";
import Link from 'next/link';
import Header from '../Header';
import Image from 'next/image';
import { ps_logo } from '@/app/assets';
import BottomBanner from '@/app/home/BottomBannerasas';
import { Footer } from '../Footer';

type Props = {
    children: ReactNode
}

function LayoutForBuy({ children }: Props) {

    return (
        <div >

            <div className=" w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">
                <Header
                    logoSection={
                        <Link
                            href={'/'}
                        >
                            <Image src={ps_logo.src} alt="" width={140} height={50} className='object-contain h-full  max-w-[200px] w-full' />
                        </Link>

                    }
                />
            </div>

            <main>
                {children}
            </main>


            

            <BottomBanner />

            <Footer/>

        </div>
    )
}

export default LayoutForBuy