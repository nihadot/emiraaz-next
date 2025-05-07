import React from 'react'
import ProjectHeader from './ProjectHeader';
import Image from 'next/image';
import { info_icon, report_icon, tick_green_icon } from '@/app/assets';
import PrimaryButton from '@/components/Buttons';

type DetailItem = {
  title: string
  content: string
}

type Props = {
  headerTitle: string;
  data: { label: string, value: string }[]
  icon: boolean,
  qrCodeUrl: string;
  reportedProjectHandler: () => void;
}
function RegulatoryInformation({ qrCodeUrl, icon, data, headerTitle, reportedProjectHandler }: Props) {
  return (
    <div className='mt-0 w-full'>
      <div className="flex py-2 gap-[9.75px] items-center ">
        <ProjectHeader
        contentClassName='font-medium text-[18.75px]' 
        
        title={headerTitle}  />
        {icon && <Image src={tick_green_icon} alt="location" width={20} />}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between w-full ">

        <div className="grid w-full max-w-[322px] grid-cols-1 gap-x-6">
          {data.map((item, index) => (
            <PropertyDetailItem key={index} title={item.label} content={item.value} />
          ))}



        </div>
        <div className="my-6 sm:my-0 relative h-[101.25px] w-[101.25px] ">

          <Image fill src={qrCodeUrl} alt={'QR code'} className="object-cover" />
        </div>


      </div>

      <div className="mt-[24.75px] hidden md:block">

        <PrimaryButton
        onClick={reportedProjectHandler}
          type="button"
          className=" bg-[#FFE7EC] max-w-[280px] w-full border-none "
      >
<div className="flex justify-center items-center gap-2">
              <Image src={report_icon} alt="save icon" width={21} height={21} className='object-cover' />
              <label className="text-sm font-medium text-[#FF1645] text-[14.25px] font-poppins">Report Property</label>
            </div>
            </PrimaryButton>
      </div>
    </div>
  )
}

export default RegulatoryInformation


const PropertyDetailItem: React.FC<DetailItem> = ({ title, content }) => {
  return (
    <div className="flex font-poppins gap-[20.25px] py-3 items-center ">
      <p className="flex-1 font-normal gap-[6.75px] flex items-center text-[#333333]">
        <label className='font-poppins text-nowrap font-normal text-[13.75px]'>{title}</label>
        <Image src={info_icon} alt="location" width={15} height={15} />
      </p>
      <p className="flex-1 text-[13.5px] font-poppins text-black">{content}</p>
    </div>
  )
}