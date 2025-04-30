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
      <div className="flex py-2 pb-3  gap-2 items-center ">
        <ProjectHeader title={headerTitle}  />
        {icon && <Image src={tick_green_icon} alt="location" width={20} />}
      </div>
      <div className="flex flex-col sm:flex-row items-center py-4 justify-between w-full ">

        <div className="grid w-full sm:max-w-[300px] grid-cols-1 gap-x-6">
          {data.map((item, index) => (
            <PropertyDetailItem key={index} title={item.label} content={item.value} />
          ))}



        </div>
        <div className="my-6 sm:my-0 relative sm:w-[120px] h-[135px] w-[135px] sm:h-[100px]">

          <Image fill src={qrCodeUrl} alt={'QR code'} className="object-cover rounded-md" />
        </div>


      </div>

      <div className="">

        <PrimaryButton
        onClick={reportedProjectHandler}
          type="button"
          className=" bg-[#FFE7EC] w-full sm:max-w-[300px] items-center border-none text-[#FF1645] font-poppins rounded "
      >
<div className="flex justify-center items-center gap-2">
              <Image src={report_icon} alt="save icon" width={21} />
              <label className="text-sm font-medium text-[#FF1645] font-poppins">Report Property</label>
            </div>
            </PrimaryButton>
      </div>
    </div>
  )
}

export default RegulatoryInformation


const PropertyDetailItem: React.FC<DetailItem> = ({ title, content }) => {
  return (
    <div className="flex font-poppins gap-24 py-3 items-center ">
      <p className="flex-1 font-normal gap-2 flex items-center text-gray-600">
        <label>{title}</label>
        <Image src={info_icon} alt="location" width={20} />
      </p>
      <p className="flex-1 text-[14px] text-gray-800">{content}</p>
    </div>
  )
}