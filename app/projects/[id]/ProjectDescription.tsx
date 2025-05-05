'use client'

import React, { useState, useEffect } from 'react'
import ProjectHeader from './ProjectHeader'
import NewModal from '@/components/NewModal/NewModal'
import PrimaryButton from '@/components/Buttons'
import { close_icon, notes_red_edit, save_icon, share_button_icon } from '@/app/assets'
import Image from 'next/image'

interface ProjectDescriptionProps {
    title?: string
    descriptionInArabic: string
    descriptionInEnglish: string
    descriptionInRussian: string
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
    title = 'Description',
    descriptionInArabic,
    descriptionInEnglish,
    descriptionInRussian
}) => {
    const options = [
        { label: 'English', value: 'english' },
        { label: 'Arabic', value: 'arabic' },
    ]

    const [selected, setSelected] = useState<string>('english')
    const [modalOpen, setModalOpen] = useState(false)
    const [isTruncated, setIsTruncated] = useState(false)
    const [shortDescription, setShortDescription] = useState('')

    const getSelectedDescription = () => {
        switch (selected) {
            case 'arabic':
                return descriptionInArabic
            case 'english':
            default:
                return descriptionInEnglish
        }
    }
    useEffect(() => {
        const fullDescription = getSelectedDescription()
        if (fullDescription.length > 300) {
            setShortDescription(fullDescription.slice(0, 300) + '...')
            setIsTruncated(true)
        } else {
            setShortDescription(fullDescription)
            setIsTruncated(false)
        }
    }, [selected, descriptionInArabic, descriptionInEnglish, descriptionInRussian])

    const handleSelect = (value: string) => {
        setSelected(value)
    }

    return (
        <div className="space-y-2 ">
            <ProjectHeader contentClassName='font-medium font-poppins text-[16.5px]' title={title} />

            <p className="text-[12px] text-[#333333] font-poppins font-light">{shortDescription}</p>

            {isTruncated && (
                <button
                    onClick={() => setModalOpen(true)}
                    className="text-[#FF1645] font-medium text-[12px] flex justify-center items-center font-poppins bg-[#FFE7EC]  w-[84.5px] h-[27px] py-[8px] rounded text-sm"
                >
                    Read more
                </button>
            )}
  

        
  <NewModal
          onClose={() => setModalOpen(false)}
          isOpen={modalOpen}
          contentClassName="flex rounded-[6px] flex-col bg-white p-0 max-w-[1200px] m-auto w-full h-screen  sm:max-h-fit"

        >


          <div className=" flex flex-col bg-white p-[15px] rounded-[6px] max-w-[1200px] w-full h-screen sm:h-[85vh]">
            <div className=" flex justify-end  items-end" onClick={()=>setModalOpen(false)}>
              <Image src={close_icon} alt="save icon" width={12} height={12} />
            </div>




            <div className="  flex h-[48px] py-2 px-1  sm:border-[#DEDEDE] sm:border my-2 sm:my-2 items-center  text-sm gap-[7.5px] rounded-md  ">
              {options.map((item) => (
                <button
                  key={item.value}
                  className={` font-normal gap-[7.5px] font-poppins text-[14px] rounded-md px-4 py-1 h-[40px] flex items-center   justify-center transition-all w-full duration-200 ${selected === item.value
                    ? 'bg-red-600/10 text-red-600'
                    : 'bg-white text-[#767676] hover:text-red-600 hover:bg-red-100'
                    }`}
                    onClick={() => handleSelect(item.value)}
                    >
                  {/* {item.icon} */}

                  {/* <Image src={item.icon} alt='menu icon' width={20} /> */}

                  <span className="font-poppins font-medium text-[12px]">{item.label}</span>
                </button>
              ))}
            </div>

       
            <div className=" flex-1 overflow-y-auto">
            {selected === 'arabic' && <Content
            title='Description'
              description={descriptionInArabic}
            />}

{selected === 'english' && <Content
            title='Description'
              description={descriptionInEnglish}
            />}
               </div>



            <div className="flex mt-[17.25px] gap-[7.5px] items-center sm:justify-end">
            <PrimaryButton
        type="button"
        className="bg-[#FFE7EC] border-none text-[#FF1645] font-poppins rounded "

      >
        <div className="flex items-center w-[60px] h-[35.25px] justify-center gap-2">
          <Image src={save_icon} alt="save icon" width={21.75} height={21.75} />
          <label className="text-[14.25px] text-[#FF1645] font-medium font-poppins">Save</label>
        </div>
      </PrimaryButton>

      <PrimaryButton
        type="button"
        className="bg-[#FFE7EC] border-none text-[#FF1645] font-poppins rounded "

      >
        <div className="flex items-center gap-2 w-[60px] h-[35.25px] justify-center">
          <Image src={share_button_icon} alt="share icon" width={21.75} height={21.75} />
          <label className="text-[14.25px] text-[#FF1645] font-medium font-poppins">Share </label>
        </div>
      </PrimaryButton>


      <PrimaryButton
        type="button"
        className="bg-[#FFE7EC] border-none text-[#FF1645] font-poppins rounded "

      >
        <div className="flex items-center gap-2 w-[147.75px] h-[35.25px] justify-center">
          <Image src={notes_red_edit} alt="share icon" width={21.75} height={21.75} />
          <label className="text-[14.25px] text-[#FF1645] font-medium font-poppins">Enquire Now </label>
        </div>
      </PrimaryButton>
            
            </div>

          </div>

        </NewModal>



        </div>
    )
}

export default ProjectDescription

type ContentProps = {
    title: string
    description: string
}

function Content({ title, description }: ContentProps) {
    return (
        <div className='flex-1'>
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="text-[12px] text-[#333333] font-normal font-poppins whitespace-pre-line">{description}</p>
        </div>
    )
}
