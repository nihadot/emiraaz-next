import Container from '@/components/atom/Container/Container'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import SpaceWrapper from '@/components/atom/SpaceWrapper/SpaceWrapper'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import clsx from 'clsx'
import React from 'react'

function page() {


  const terms = [
    {
      title: '1. INTRODUCTION',
      content: [
"1.1 Property Seller is a company registered in Dubai with its registered office at Blue Bay Tower, Business bay, Dubai, UAE , which owns and operates the website www.propertyseller.ae",
"1.2 This document is termed as ‘The Privacy Policy’, or the policy forms part of the Terms of Use related to the use and information of the use of the website. By using the website you consent to us collecting, using and disclosing your information according to the terms of this Policy, listed here. The Policy listed here may be amended from time to time without any prior notice, and the changes made will be effected from the date on which it becomes published in the Website. If you have any objections to the Policy statements or the amendments made here then you must immediately stop using the website or make use of its contents.",
`1.3 The terms mentioned as “we", "our", "us" , here means ‘The Property Seller’ and its affiliates, subsidiaries, employees, agents or assigned parties.`,
"1.4 This Policy becomes effective between you and us from the date of use of this website, which by default means that you consent to the terms listed in the Policy.",
"1.5 If due to any reasons any term of this Policy becomes invalid or unlawful, the viability and enforceability of the remainder will not be affected.",
"1.6 The use and the purpose of use of the data is determined by a Data Controller which expression would mean a person, who by himself or jointly act as a legal entity.",
"1.7 With respect to the data processed by the website, ‘The Property Seller’ vests control as the Data Controller. The Property Seller is part of the ………………… Group of companies, which for reference also include……………",


]
    },
    {
      title: "2. YOUR INFORMATION",
      content: [
        "2.1 The type of information we collect is either personal or general in nature:",
        "a. Personal Information: Whilst you sign in on the website as a consumer or otherwise, update your facts, buy any goods or services, participate in promotions or campaigns or contest, sign into our cell software using personal data or a social media account, ship emails to us, ship help requests, touch estate dealers through forms or cell phone numbers made accessible on our website, give response, or whenever you report an issue with our website, you give us data that we store and process. Such data may include your name, email id, purchases and agreement history. We will also have access to your billed information (including your credit card information), interests and any other such Personal Information.",
        "b. General Information: We also obtain more General Information of yours with the use of our website by you. This information doesn’t describe you personally but can include data such as your IP address, the time and date of access of the website, duration of time you spent on the website, your browsing history documented by text and graphic files that constitute that page), the internet address from which you joined directly onto our website , and other such information.",
        "c. Payment Data: Payment data is the data that is provided by you while making purchases online. This might include your credit or debit card number , your name and the billing address. It may also be inclusive of your CSV or CVV number subjected to your mode of payment. You hereby acknowledge and agree that Payment Data, relating to the amount of details of mode of payment of fees for the usage of the website and services (like information relating to bank account, credit card, debit card, net banking, etc.) given by you whilst making the payment of fees:",
        "(a)goes through safe and secure channels provided by ‘the uae seller.com’ payment gateway partners;",
        "(b) goes through the Visa or MasterCard pages, accordingly, depending upon your mode(s) of payment. In order to avoid any exploitation of your mode of payment details,",  
    
    "(d) Information we receive from other sources: We may get information about you, by your usage of any of our websites that we operate on, or from any other services we render. We are also working jointly with third parties, inclusive of but not limited to, business partners, service providers, advertising organizations, analytics providers and search information providers. We may get details about you from such third parties. This data may be joined with some other data you gave to us, as mentioned above."  ]

    },



    {
      title: "3. COLLECTING AND USING INFORMATION:",
      content: [
"3.1The most part of this website can be used without divulging details . But, some services and third party technology however may engage in collection and usage of data from you, including but not limited to , Google Analytics (a detailed report of their specific data collection and processing policies can be found through the following link:https://www.google.com/policies/privacy/partners/).",
"3.2 We make use of Personal Information to provide you with the following services:",
"a)To provide you with any services that you might have requested of us.",
"b)To provide you better quality service , and also to keep internal records so as to improve our goods, services and the Website.",
"c) To contact you in case of any order, purchase or participation in any of our offers on the website.",
"d)To gather information for market research processes.",
"e)To brief you about new possibilities, promotions, special offers and other details we may regard as beneficial to you. If you reach out to us through the Website, or through email to the contacts set on the website, we would like to keep a record of that correspondence.",
"f)To give you information about goods and services that might be of interest to you or let you select third parties to do the same."
]
    },
   
    {
      title:"4. DISCLOSURE OF PERSONAL INFORMATION",
      content:[
      "4.1 With using our website you consent to sharing your information to third parties in the following manner:",
      "a.Agents, developers, third party brokers, real estate firms or other service providers associated with us if asked to, though it is understood as part of your use of the website or its contents. Given an instance, if you enquire with us, information given by you regarding your contact details will be passed on to the brokers or property handlers dealing with the respective property for further course of action. Further to receiving your details the third party receiving your details will become the Data controller thereon and their use of your information will be done in accordance to their terms of use and privacy policy.",
      "b.suppliers and subcontractors will have access to your information for the execution of any contractual terms entered into with them.",
      "c.To Third-party service providers we associate with. Whereas your information will be shared to them only if required for the services they provide us. Services can be software, system, and platform support; direct marketing services, cloud hosting services, advertising, data analytics, taking orders and for completing delivery. But our service providers are not allowed to disclose or use the information we provide for any other purposes other than to fulfill our commitments.",
      "4.2 Your Personal Information may also be shared with third parties:",
      "a.Your Personal Information will be disclosed to the prospective seller or buyer in the event of selling or buying of any business or assets. If ‘The Property Seller’’, or in substance all of its assets are acquired by a third party, information held by it regarding customers will also be one of the transferred assets;",
      "b.For obtaining professional advice;",
      "c.To fulfill legal obligations if we are compelled under any circumstances, in order to enforce law or to exercise any conditions specified in the terms of use or other agreements entered into. or",
      "d.To safeguard the interests that include the rights and assets of The Property Seller, any of our associates, clients or officials. This would mean the exchange of information with other organizations, groups or concerns for protection against fraud."  
      ]
    },
    {
      title:"5. SECURITY",
      content:[
"5.1 We value your privacy and it is in our top priority to keep your personal/contact Information secure and prevent any unauthorized access to it. We have put in place the required measures that are necessary to safeguard your information, while we cannot be held responsible for any unauthorized access by any third parties or associates. We also cannot assure or guarantee that there wouldn't be information loss while being transmitted through this site or any other electronic media.",
      ]
    },
    {
      title:"6. STORAGE OF YOUR PERSONAL INFORMATION",
      content:[
"6.1 Where a password was created for your needs or where you have been provided with one to access the different sectors of the domain or part of it, we would ask you not to disclose it to anyone and that it should be for all purposes kept confidential.",
"6.2 As information shared online is not secure, we will try to guard your personal information though we cannot guarantee the security of the details transmitted online. Sharing of any kind of information is done at your own risk. However we will put our best efforts to prevent unauthorized access to the details through strict guidelines and security norms."      ]
    },
    {
      title:"7. YOUR RIGHT TO ACCESS AND CORRECT YOUR PERSONAL INFORMATION",
      content:[
"7.1 You have the right to access and control your information. Your requests will be honored and wherever applicable the data can be corrected, amended or deleted. Kindly write to support@the propertyseller.ae for further queries.",
"7.2 Access to personal information:You can request access to the information provided by you and will be granted access unless subject to any legal exemptions. You are required to produce identity proofs to comply with the verification processes. A small fee is also charged for providing a copy of the relevant data.",
"7.3 Correction and deletion: You have the right to delete, update or amend your personal information. However we would request you to exercise discretion in doing so due to complying with legal requirements.",
"7.4 Marketing preferences: You can use the unsubscribe link to stop receiving email communication or you can send a mail to support@propertyseller.ae. For enquiries on Marketing you can use any of the links mentioned in the marketing and communication section or by sending an email to marketing@propertyseller.ae.",

]
    },
    {
      title:"8. USE OF COOKIES",
      content:[
"8.1: This website uses cookies (which is not limited to google analytics and double click for publishers. Information regarding google partner sites can be found in the link provided here: https://www.google.com/policies/privacy/partners) which are files that collect data store information in your hard drive. Cookies are meant to restrict uses of such information. It allows the website to track account holders, identify new users and record the usage of sessions which are basically meant to optimize the usage of the site for better experience. Cookies are automatically deleted after a period of time for online advertisements. Details regarding this are available at support@the propertyseller.ae",
"8.2 Though browsers accept cookies automatically it can be disabled from the browser. With the cookies deleted from your browser, you may find that certain functions and features will not work as intended on the site disrupting services",
"8.3 The following sites provide more information on the various types of cookies, the way they are used and how to manage preferences: http://www.aboutcookies.org/ or http://www.allaboutcookies.org/.",

]
    },
    {
      title:"9. USE OF THIRD PARTY ANALYTICS AND TRACKING PIXELS",
      content:[
      "9.1This domain uses Third Party Analytics for performance analysis of the site. These Third Party Analyticsin turn use cookies or text files to analyze website visits or traffic. The information generated by cookies may use the details provided by you (including your IP address) and transfer it to the servers operated by theseThird Party Analytics. This information is generated to evaluate your use of this site, compile reports about this website’s activity for our reference, and deliver other related services related to the website and Internet use. Third Party Analytics may also share this information with their third parties if required for processing information on behalf of them.",
      "9.2The cookies may be disabled from your browser by adjusting your browser settings. However, by doing so you may not be able to make the full use of all the functions available on this Website. With using this Website, you also agree to Third Party Analytics, making use of your information in the manner discussed earlier in this Policy. We or our respective suppliers, our partners, officers, directors, managers, members, agents, and employees directly linked with the company are not in any way liable for any direct or indirect consequences arising out of the use of the information discussed here, or in any way connected to it .",
      "9.3Our Website also makes use of Third Party tracking pixels. This would mean that third parties will make use of cookies, web beacons, and similar technologies to retrieve or receive information from our Website and elsewhere on the internet and use that information to provide data on web analytics. If you wish not to entertain the use of these tracking pixels we would request you to adjust your browser settings accordingly."  
      ]
    },
    {
      title:"10. WEB SERVER & APPLICATION LOGS",
      content:["10.1 Our servers have been programmed to collect certain information from the users visiting our website to help us monitor and protect our interests in the services we provide. This is basically used to analyze usage, and improve users’ experience. The information collected includes, amongst others: a.Links and tabs clicked b.The type of browser used and IP address c.Information on the device used including Unique Device Identifier (UDID), system address, Identifier For Advertisers (IFA), and similar identifiers as assigned by us. d.Operating system of the device and other technical facts e.Page visits and content viewed, saved, and purchased f.Details provided g.URLs visited during, before and after you use our Services"]
    },
    {
      title:"11. THIRD PARTY ADVERTISERS",
      content:["11.1 Third party advertising networks are allowed to place advertisements on the site on our behalf. They may use cookies in the visitor’s cookie file, which will have their own target technology in place to serve their needs",

        "11.2 Advertisements from these third-party advertisers may contain personalized banners which apply technology to serve their ends. They collect data according to the applicable laws and regulations.(including but not limited to laws governing privacy, and data protection).",
        "11.3Third party advertisers operate on their own Privacy Policies which are made available on their websites. For further information on what third party advertisers do please get in touch with info@thepropertyseller.ae",
      ],

    },
    {
      title:"12. INTEREST-BASED ADVERTISING (IBA)",
      content:["12.1 IBA or Interest-based advertising are meant to deliver advertising material to users who show specific interest (target audience) while using our Services. It works by targeting users based on the type of content they access or read. For instance, as you browse our services page, the cookies placed on your device will be an advertising cookie so as to better understand the content you are interested in. This information collected from your device is grouped with information from other devices that show similar interests. This is then used to display advertisements to users grouped on the basis of common interests.",

        "12.2 You have the option to opt out of receiving Interest Based Advertisements though it does not mean that you will no longer receive advertisements when you are using our services. It would imply that the information collected will not pertain to IBA and that any advertisements you see will not be customized or be relevant to you. You can choose your online advertisement choices from http://optout.aboutads.info or by clicking the AdChoices icon in an ad and go by the instructions. Similarly you may also opt out of receiving interest-based ads from many sites through the Network Advertising Initiative's (NAI) Opt Out Tool (http://www.networkadvertising.org/choices) It would be advisable to delete cookies, using a different device.",
        "12.3 Mobile devices are provided with identifiers that help track the target users to serve ads in the target category to specific mobile devices. You can disable the mobile device ad tracking or can reset the identifiers at any time within your mobile device privacy settings. One other way to control ad sense on mobile devices is the AppChoices App: http://youradchoices.com/appchoices. You can also turn off location tracking on your mobile device. If these settings are disabled, the information collected from your device’s advertising identifier will not be used for tracking ad sense. After this the number of ads you may see will still be the same but they may be less relevant as they will not be based on your interests."
      ],

    },
    {
      title:"13. LINKS AND CONNECTIONS TO AND USE OF OTHER THIRD-PARTY SERVICES",
      content:["13.1 Our site may contain links that are connected to third party apps, which you may come across while using the website, that are not directly linked to us. These links may lead you to social media or other related sites that are not controlled by us. The Privacy policies of these third party sites are governed by their own policy statements over which we have no control. You are requested to review the Terms of Use and Privacy Policy of these third party links. Information that is provided to third-party companies or sites does not come under this Policy."],

    },
    {
      title:"14. PRIVACY OF MINORS",
      content:["C14.1 Minors are not allowed to use the website or its services.Our users should be of the age of 18 or more. Any information collected about minors with the use of the site will comply with applicable laws."],
    },
    {
      title:"15. BUSINESS TRANSFER",
      content:["15.1 As part of business transfer or acquisitions or in the unlikely event of insolvency the information gathered from the site will have to be transferred to the company or organization taking over, pursuant to this Policy that will form part of the transferred assets. As a user you acknowledge the transfer of the information to the acquirer or successor to ‘The Property Seller’, who may continue to use the data pursuant to this Privacy Policy, in the way detailed in this document."],

    },
   
  ]



  return (
    <main>
      <Header />

      <SectionDivider
        containerClassName="mt-[10.5px] mb-[12px]"
        lineClassName="h-[1px] w-full bg-[#DEDEDE]"
      />

      <Container>



        <h1 className='font-poppins  mt-[20px] sm:mt-[51px] text-center font-medium text-[19.5px] sm:text-[37.5px]'>
        Privacy Policy
        </h1>

        <SpaceWrapper className='sm:mt-[46.5px] mb-20'>

          {
            terms.map((item, index) => {
              return <div key={index} className=''>
                <Title
               
                  title={item.title}
                />
                {item.content.map((content, i) => {
                  return (
                    <Paragraph
                    key={index}
                      className='mb-2'
                      content={content}
                    />
                  )
                })}
              </div>
            })
          }

          {/* 
          {data.map((section, i) => (
            <div key={i}>
              <h2 className="font-bold mb-2">{section.title}</h2>
              {section.content.map((item, j) => (
                <React.Fragment key={j}>{item}</React.Fragment>
              ))}
            </div>
          ))} */}
        </SpaceWrapper>

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