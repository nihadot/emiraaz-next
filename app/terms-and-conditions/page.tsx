import { baseUrl } from '@/api'
import Container from '@/components/atom/Container/Container'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import SpaceWrapper from '@/components/atom/SpaceWrapper/SpaceWrapper'
import MobileHeaderTitle from '@/components/atom/typography/MobileHeaderTitle'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import TermsAndConditionsResponsive from '@/components/TermsAndConditions/TermsAndConditionsResponsive'
import clsx from 'clsx'
import { Metadata } from 'next'
import React from 'react'



// Enable ISR with 60-second revalidation
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {

  try {
    // Fetch metadata with cache-busting timestamp to ensure fresh data
    const responseData = await fetch(
      `${baseUrl}/meta-data?referencePage=terms-and-conditions`,
      {
        next: {
          revalidate: 60 // Revalidate every 10 seconds
        },
      }
    ).then((res) => res.json())

    const data = responseData?.data?.[0] || {};

    return {
      title: data.metaTitle || "Property Seller - Trusted Off-Plan Real Estate Marketplace",
      description: data.metaDescription || "Learn how Property Seller is transforming real estate with verified listings, expert support, and exclusive off-plan property opportunities in Dubai and beyond.",
      keywords: data.keywords || 'Property Seller, Real Estate, PropertySeller, Dubai, UAE, Trusted Real Estate Platform, Off-Plan Property, Rental Income, Rental Income Calculator',
      openGraph: {
        title: data.openGraphTitle || " Simplifying Real Estate Investments",
        description: data?.openGraphDescription || "Discover Property Seller’s mission to simplify real estate, connect buyers with top developers, and offer transparent, hassle-free property investments.",
        url: data?.openGraphUrl || "https://www.propertyseller.com/terms-and-conditions",
        siteName: data?.siteName || "Property Seller",
        images: [
          {
            url: data?.metaImage?.url || "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
            width: 1200,
            height: 630,
            alt: data?.metaImage?.openGraphTitle || "Connecting Buyers with Trusted Developers",
          },
        ],
        type: data?.type || "website",
      },
      twitter: {
        title: data.twitterTitle || 'Property Seller',
        description: data.twitterDescription || 'Learn about PropertySeller',
        images: data.twitterImage ? [data.twitterImage.url] : ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
      },
      alternates: {
        canonical: data.canonical || "https://www.propertyseller.com/terms-and-conditions"
      }
    }
  } catch (error) {

    // Return fallback metadata
    return {
      description: "Learn how Property Seller is transforming real estate with verified listings, expert support, and exclusive off-plan property opportunities in Dubai and beyond.",
      openGraph: {
        title: "About Property Seller | Simplifying Real Estate Investments",
        description: "Discover Property Seller’s mission to simplify real estate, connect buyers with top developers, and offer transparent, hassle-free property investments.",
        url: "https://www.propertyseller.com/terms-and-conditions",
        siteName: "Property Seller",
        images: [
          {
            url: "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
            width: 1200,
            height: 630,
            alt: "About Property Seller - Connecting Buyers with Trusted Developers",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "About Us | Property Seller - Trusted Real Estate Platform",
        description: "At Property Seller, we connect you with the best off-plan property investments—offering expert guidance, verified projects, and complete transparency.",
        images: ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
      },
      alternates: {
        canonical: "https://www.propertyseller.com/terms-and-conditions",
      },
    }
  }
}





function page() {


  const terms = [
    {
      title: '1. TERMS',
      content: [
        "1.1 The term mentioned here as ‘we’,’our’ and ‘us’ would mean ‘The Property Seller's, its representatives, subsidiaries, agents, affiliates or its assigned parties.",
        "1.2 The website and its contents is herein referred to as ‘www.propertyseller.com",
        "1.3 With using the website you agree to bind by the website’s terms of use and its privacy policy and agree to comply with all the applicable governing rules. All the content contained in this website is protected by copyright and trademark law.",
        "1.4 The site is open to be used by people above the age of 18 unless legally restricted from using the site under the laws of the country of your residence."
      ]
    },
    {
      title: "2. USE LICENSE & RESTRICTIONS:",
      content: [
        '2.1 The materials contained in the site can be temporarily downloaded for personal and non-commercial viewing only, which does not imply:',
        "a) Modifying or copying the contents",
        "b) To use for any kind of display both commercial and non-commercial",
        "c) Manipulate the website or its functionalities in any way.",
        "d) Remove copyright or trademarks.",
        "e) Transfer of materials to any entity or server.",


        "2.2 In using the website, you agree to undertake not to engage in the following activities:",
        "a) Engage in any activities that will tamper the contents, infrastructure or the working of the site.",
        "b) Manipulate the contents, database or functionality of the website for any unauthorized activities.",
        "c) Infringe upon any person’s or property right including copyright, trade secret, privacy right.",
        "d) Impersonate to extrude money, passwords or personal information from any person, entity or enterprise.",
        "e) Create any kind of virus or malware intended to transmit destroying the site.",

      ]

    },
    {
      title: "3. YOUR RESPONSIBILITIES",
      content: [
        "3.1 We do ot claim to be a real estate agency, we only provide services where agents can market. You may view the details of the property along with the other contents provided in the website. The third parties and the agencies are responsible for the details provided and the retrieving the enquiries from you. We only facilitate the generation of the enquiry and do not form part of the conversation, deal or transaction between you and the agency.",
        "3.2 All the details posted in the website are directly provided by the agencies/third parties and are uploaded in good faith. Though we put in good effort to verify the details, it is your responsibility to make your own enquiries and verify the same. We offer no guarantee on the accuracy of the information provided by the third parties / agencies.",
        "3.3 We expect good demeanor and to act in good faith towards the agencies.",
      ]
    },
    {
      title:"4. LIMITATIONS",
      content:[
        "4.1 We accept no liability for damages in any event due to the use or lack of proper use of the details of the site.",
        "4.2 We do not take up any responsibility for any loss or damage due to the following conditions: Any software or connection errors or unavailability of content, or any other events beyond our reach or control",
        "a) any loss of account or password, caused due to a system breakdown or power failure or due to the non-retrievability of your account",
        "b) The dependency on any content hosted in our Website",
        "c) any direct, consequential, special or punitive loss, damage, costs and expenses",
        "d) Profit loss",
        "e) Business loss",
        "f) Lack of goodwill or something affecting your reputation or",
        "g) Data loss or data corruption",
        "4.3 Unless we enter into an agreement the use of our website or its contents are not to be used for any business purpose.",
        "4.4 We do not take any liability for loss or damage of contents due to virus attacks, service attack or other technologically malfunctionings that may infect your system due to the download of any programmes , content or software from our site. 4.5 By enquiring through our Website, you agree to share your details with the agent, estate agent, landlord, developer marketing the property, you enquired about."
      ]
    },
    {
      title:"5. REVISIONS AND ERRATA",
      content:[
        "The details contained in the site could have some typographical, or photographic errors. We do not claim any accuracy to the details published.Changes may be made in the site from time to time without any prior notice.",

      ]
    },
    {
      title:"6. AVAILABILITY OF WEBSITE",
      content:[
        "The website and its services will be available to you round the clock, but in case of any updates, we would put our best efforts to intimate you beforehand but cannot guarantee fault free continuous services. Maintenance works and updations would require attention and might interrupt service or lead to data loss. It is in our discretion to change or discontinue any part of the website or the services which would also mean your access to the site and its services."
      ]
    },
    {
      title:"7. THIRD PARTY ADVERTISEMENTS",
      content:[
        "We do not endorse any advertisements or links that appear in the site advertisements on our Website.We also do not take up any responsibilities for any warranties or representations of advertisements made by any third party or agencies. It is the sole discretion of the user to verify the details before entering into any contract or purchase of the product. Information published in our publications, posts, or inserts should not be considered as a substitute for professional legal, financial or real estate advice."
      ]
    },
    {
      title:"8. SITE TERMS OF USE MODIFICATIONS",
      content:[
        "The terms of use or any such terms with respect to the Website is subject to changes at any time without notice. By using the website and its services you agree to be bound by the Terms of Use."
      ]
    },
    {
      title:"9. CONTRIBUTIONS",
      content:[
        "9.1 ‘ Contributions’, the term here in these ‘Terms of Use’, pertains to any kind of information that includes data,text, video, images or any other material that was permitted to be uploaded, shared, published, or saved in the website.",
     "9.2 The said contributions can at any time be removed, altered or denied access to you without any prior notice and we reserve the right to do so without any intimations or communications pertaining to it if found:",
     "a) That the contentiousContributions are in violation of any law or regulation;",
     "b) That the Contributions encroach upon the intellectual property rights of any third party;",
     "c) That it is required to do so by an authority or any regulatory body, to take-down the contents in the contribution, that are",
     "1. misleading",
     "2. inappropriate with respect to the purpose of our Website;",
     "3. Offensive and obscene",
     "4. Incorrect matter;",
     "5. Unlawful content as per the norms and conduct of a particular region.",
     "6. Malicious, any kind of spyware that can corrupt the website.",

     "9.3 With ‘Contributions that satisfy all norms, you offer us an exclusive right over the content that grants us a royalty free , irrevocable, perpetual and transferable license to reproduce, modify, distribute and publish, display and publicize your content across the world through any medium.",


     "9.4 Each user of the website has the right to use your name or the one attached to your content along with the right to represent and warranty that:",
     "1. you are in absolute control and ownership of the contents in the Contributions.",
     "2. you are in possession of all the necessary licenses, rights, that grants you permission to use and authorize us to publicize your Contributions.",


     "9.5 In case of any Contributions that you retain moral rights over, then , you declare that:",
     "No information that is personally related is contained in the Contribution, or any related work, that is an updation of the Contribution; and",
     "You accept and agree that we do not have any control of and are not responsible for the tampering or use of these Contributions by any third party or user.",


     "9.6 You represent and warrant that:",
     "1. you have the lawful right including all necessary licenses, rights, consents and permissions to use and authorize us to display your Contributions;",
     "2. You will not make any Contributions that violates the rights of any third party, and that you will pay all royalties, fees or other payable amount for the Contributions made by you; and",
     "3. Your Contributions will not contain any contents that are :",
     "1. Misleading",
     "2. Deceptive",
     "3. Incorrect",
     "Offensive",
     "5.directly or indirectly related to any advertising or marketing of any products or services",
     "6.Obscene, that includes pornographic, hate, racial or ethnically offensive materia",
     "7.Defamatory or",
     "8.Unlawful or that which encourages unlawful conduct."
      ]
    },
    {
      title:"10. INTELLECTUAL PROPERTY",
      content:["10.1 Unless otherwise expressed, all contents of the Website are copyrights, trademarks, trade dress or any other intellectual property owned and controlled by us, or one of our associates or by third parties who have entered into agreement with us and are protected by the applicable laws.",
        "10.2 We, along with our suppliers and licensors have absolute authority over all intellectual property rights in all contexts, programs, products, processes, technology, content and any other materials, which appear here in the site. Having access to this Website does not mean conferring upon any right to anyone under any conditions or any third party's intellectual property rights. Using the contents of this website, including copying or saving them in whole or part, other than for your own personal, non-commercial use, is not permitted without our consent. You may not alter, propagate or re-post anything on this site for any purposes.",
        "10.3 The Names and logos and all related product and service names, design marks and slogans are our trademarks or service marks belonging to us or our licensors.",
        "10.4 Access to this Website does not authorize anyone to use any name, logo or mark in any manner."
      ]
    },
    {
      title:"11. ELECTRONIC COMMUNICATIONS",
      content:["By using the website or sending us mails, you are engaging with us through the electronic media. Our communications with you are basically through emails or through posts on the web-sites. With communicating with us you consent to receive electronically any communications related to the use of our site. Any communication from us is intended for receipt by you and shall be deemed delivered and effective when sent to the email address you provide on the Website for your account"],

    },
    {
      title:"12. INDEMNITY",
      content:["12.1 This is to state that you agree to indemnify and hold us and our affiliates (which will include our officers, agents, partners and employees) against any and all loss, liability or claim that includes the attorney’s fees, in connection with the use of and access to our Website or in relation to the Contributions that are not in accordance with the Terms."],

    },
    {
      title:"13. DISCLAIMER",
      content:["The contents and the property are advertised in the website as and when they are made available. We assure no warranty, or claim to include the veracity or non-infringement of intellectual property or that which is in violation of any rights. We also do not offer any assurances on the accuracy or reliability of the materials published or linked with this site."],

    },
    {
      title:"14. MONITORING AND RECORDING TELEPHONE CALLS",
      content:["Calls of Real Estate Agents or Brokers who are engaged in our call tracking services and who have agreed to generate enquiries through our website, will be recorded for training and assistance. The calls will be recorded only with prior consent and will be reminded of the recordings before a conversation."],
    },
    {
      title:"15. GOVERNING LAW",
      content:["15.1 The Terms of use listed here and your access to the Website are subject to the jurisdiction of the laws in the United Arab Emirates as applicable anywhere in the Emirate of Dubai. Any dispute regarding the Terms of Use can be raised and challenged within its jurisdiction in the courts of Dubai.","15.2 In case any terms mentioned in the agreement become invalid, out of reason, or unenforceable under law , the maintainability of the remaining law will not be affected."],

    },
    {
      title:"16. CONTACT US",
      content:["16.1 As a real estate agency we have a valid license to sell and manage properties and execute deals. Our contractors are contractually obliged to list properties that are available for or lease with proper authentication from the property owner and the concerned governmental authorities. We expect all the properties listed in the site to be its original portrayal, with the right information provided on the proposed transaction. Incase you come across any misleading information, wrong portrayal or suspected misrepresentation of any of the properties listed in the website, please feel free to inform us with the details to abuse@propertyseller.com For any queries, complaints or recommendations about these Terms of Use, please contact us at the following address: info@propertyseller.com"]
    }
  ]


  return (
    <main>
      <Header   logoSection={
               <div className='h-full w-full flex justify-center items-center'>
                 <MobileHeaderTitle
                content='Terms & Conditions'
                />
               </div>
            }/>

      <SectionDivider
        containerClassName="mt-[10.5px] mb-[12px]"
        lineClassName="h-[1px] w-full bg-[#DEDEDE]"
      />

      <Container>



      
      <TermsAndConditionsResponsive terms={terms} />

       
      </Container>

      <Footer/>

    </main>
  )
}

export default page





function Title({ title, className }: { title: string, className?: string }) {
  return (
    <p className={(clsx('text-[19px] mt-[19px] mb-2 font-poppins font-medium', className))}>{title}</p>
  )
}




function Paragraph({ content, className }: { content: string, className?: string }) {
  return (
    <p className={clsx('text-[12px] font-poppins font-normal text-[#000000]', className)}>{content}</p>
  )
}