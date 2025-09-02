import React from 'react'
import Container from '../atom/Container/Container'

function HomePageContent() {
  return (
    <Container
    className='mt-12'
    >
        <h1 className='text-[18px] pb-[5.25px] font-medium font-poppins'>PropertySeller Dubai - Trusted Real Estate Partner In UAE</h1>
        <Paragraph
        content='Dubai’s real estate market is full of opportunity and PropertySeller is built to help you make the most of it. Designed to simplify the process, PropertySeller brings together verified listings, exclusive inventory, and real-time market insights, empowering both buyers and sellers with a seamless, tech-enabled experience backed by expert support at every step.'
        />
           <Paragraph
        content='To avoid what has been often overlooked in the traditional classified portals, PropertySeller has taken great care to bring full authority over its inventory - to avoid duplicate listings - hence pricing confusion, and to bring absolute transparency to the process. Maintenance of privacy is also our top priority.'
        />

        <h2 className='text-[18px] pb-[5.25px] font-medium font-poppins'>From Off-Plan to Resale: Discover More with PropertySeller</h2>
        <Paragraph
        content='PropertySeller is a full-service real estate company. We work hand-in-hand with top developers and trusted property owners across Dubai and UAE, building exclusive partnerships that give our users access to pre-launch deals, early investment opportunities, and insider listings rarely found elsewhere. '
        />

        <Paragraph
        content='Whether you’re a first-time buyer looking for a new apartment, an investor eyeing long-term growth, or a seller aiming for quick and efficient transactions and scrolling through off-plan projects, off-plan resale, secondary properties or land, you’ll find only the most reliable options on PropertySeller. '
        />

        <Paragraph
        content='PropertySeller will soon turn to your go-to solution. Our platform is designed to give you the clarity, speed, and support  to invest with full confidence . '
        />

        <h2 className='text-[18px] pb-[5.25px] font-medium font-poppins'>PropertySeller Community of Smart Buyers & Investors</h2>

        <Paragraph
        content='Join a growing community of informed investors and smart buyers who are changing the way Dubai real estate works. Experience what it means to buy and sell with purpose - with PropertySeller by your side.'
        />
    </Container>
  )
}

export default HomePageContent




 function Paragraph({
    content,
 }: {
    content: string,
 }) {
  return (
    <p
    className='text-[12px]  font-normal font-poppins pb-4'
    >{content}</p>
  )
}