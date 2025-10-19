import { baseUrl } from '@/api';
import ContactPage from '@/components/ContactPage/ContactPage'
import React from 'react'


async function page() {

   const res = await fetch(`${baseUrl}/countries`);
      const data = await res.json();
    
  return (
    <ContactPage
    data={data?.data}
    />
  )
}

export default page