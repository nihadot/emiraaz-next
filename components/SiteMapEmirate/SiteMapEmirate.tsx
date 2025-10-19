import React from 'react'
import Header from '../Header'
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle'
import { Footer } from '../Footer'
import PropertyTypeSection from './PropertyTypeSection'
import Container from '../atom/Container/Container'
import SectionDivider from '../atom/SectionDivider/SectionDivider'
import clsx from 'clsx'
import EmiratesCard from './EmiratesCard'
import { baseUrl } from '@/api'



async function SiteMapEmirate() {

        const res = await fetch(`${baseUrl}/emirate/names`);
        const responseData = await res.json();
        const data = await responseData?.data?.map((item: any) => ({
            value: item._id,
            label: item.name,
        }))
    
    return (
        <main>
            <Header
                logoSection={
                    <div className='h-full w-full flex justify-center items-center'>
                        <MobileHeaderTitle
                            content='Site Map'
                        />
                    </div>
                }
            />

            <SectionDivider
                containerClassName={clsx("mb-[12px] mt-[12px]")}
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />


            {JSON.stringify(data)}

            <Container
            className='flex flex-col gap-4'
            >


                <PropertyTypeSection />

                <EmiratesCard 
                data={data}
                />
            </Container>



            <Footer />
        </main>
    )
}

export default SiteMapEmirate





