import React from 'react'
import Header from '../Header'
import { Footer } from '../Footer'
import Body from './Body'
import SectionDivider from '../atom/SectionDivider/SectionDivider'
import clsx from 'clsx'

function AiAgent() {
    return (
        <main>
            <Header />
            <SectionDivider
                containerClassName={clsx("mb-[12px]", true ? 'mt-[12px]' : 'mt-[10.5px]')}
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />
            <Body />
            <Footer />
        </main>
    )
}

export default AiAgent