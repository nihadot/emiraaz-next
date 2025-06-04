'use client'

import React, { useState, useEffect } from 'react'
import ProjectHeader from './ProjectHeader'
import NewModal from '@/components/NewModal/NewModal'
import PrimaryButton from '@/components/Buttons'
import { close_icon, notes_red_edit, save_icon, share_button_icon } from '@/app/assets'
import Image from 'next/image'
import clsx from 'clsx'
import { PiNotePencil, PiShareFat } from 'react-icons/pi'
import { handleShare } from '@/utils/shareOption'
import { IoMdClose } from 'react-icons/io'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { useToggleWishlistItemMutation } from '@/redux/wishlist/wishlistApi'
import { errorToast } from '@/components/Toast'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface ProjectDescriptionProps {
  title?: string
  descriptionInArabic: string
  descriptionInEnglish: string
  projectTitle: string;
  projectId:string
  setEnquiryForm:(item:any)=>void;
  userId:string;
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
  title = 'Description',
  descriptionInArabic,
  descriptionInEnglish,
  projectTitle,
  setEnquiryForm,
  projectId,
  userId
}) => {
  const options = [
    { label: 'English', value: 'english' },
    { label: 'العربية', value: 'arabic' },
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
  }, [selected, descriptionInArabic, descriptionInEnglish])

  const handleSelect = (value: string) => {
    setSelected(value)
  }

    const [toggleWishlist] = useToggleWishlistItemMutation();
  
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const isWishlist = wishlistItems?.find(item => item?.propertyDetails?._id === projectId);


    const toggleWishlistItem = async () => {
  
      if (!userId) {
        errorToast("Please login to favorite this project");
        return;
      };
  
  
  
      if (!projectId) {
        return errorToast('project not found');
      }
  
  
      const payload = {
        projectId: projectId,
        userId: userId
      };
  
      try {
        await toggleWishlist(payload).unwrap();
      } catch (error: any) {
        console.error("Failed to toggle wishlist item:", error);
        errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');
  
      }
    };

  return (
    <div className="space-y-2 ">
      <ProjectHeader contentClassName='font-medium font-poppins text-[16.5px]' title={title} />

      <p className="text-[12px] break-all sm:break-normal text-[#333333] font-poppins font-light">{shortDescription}</p>

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
        wrapperClassName='!z-[60]'
        contentClassName="flex rounded-[6px] flex-col bg-white p-0 max-w-[1200px] m-auto w-full h-screen  sm:max-h-fit"

      >


        <div className=" flex flex-col bg-white p-[15px] rounded-[6px] max-w-[1200px] w-full h-screen sm:h-[85vh]">
          <div className=" flex justify-end  items-end" onClick={() => setModalOpen(false)}>
             <IoMdClose
                              className="w-[20px] h-[20px]"
                              color="#333333"
                            />
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
              title='وصف'
              containerClassName='flex justify-end'
              description={descriptionInArabic}
            />}

            {selected === 'english' && <Content
              title='Description'
              description={descriptionInEnglish}
            />}
          </div>


     <div className="flex bg-white mt-[15px] gap-1 sm:gap-[7.5px] items-center sm:justify-end">
                <PrimaryButton
                  type="button"
                  className="bg-[#FFE7EC] !px-3 sm:!px-4 !py-2 sm:!py-[9px] !w-full sm:!w-fit  border-none text-[#FF1645] font-poppins rounded "

                >
                  <div className="flex items-center h-[26px] justify-center gap-2">
                    {isWishlist ? (
                      <GoHeartFill onClick={toggleWishlistItem} color="red" className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                    ) : (
                      <GoHeart onClick={toggleWishlistItem} color="red" className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                    )}
                    <label className="text-[12px] sm:text-[14.25px] text-[#FF1645] font-medium font-poppins">Save</label>
                  </div>
                </PrimaryButton>

                <PrimaryButton
                  type="button"
                  className="bg-[#FFE7EC] !px-3 sm:!px-4 !w-full sm:!w-fit  border-none text-[#FF1645] font-poppins rounded "

                >
                  <div className="flex items-center gap-2 w-fit h-[25px]  sm:h-[28px] justify-center">
                    <div
                onClick={() => handleShare(projectTitle || '')}
                      className="w-[18px] sm:w-[21px] h-[18px] sm:h-[21px] relative">
                      <PiShareFat
                        color='#FF1645'
                        size={20}
                      />
                    </div>
                    <label className="text-[12px] sm:text-[14.25px] text-nowrap text-[#FF1645] font-medium font-poppins">Share </label>
                  </div>
                </PrimaryButton>


                <PrimaryButton
                  type="button"
                  className="bg-[#FFE7EC] !px-4  !w-full sm:!w-fit border-none text-[#FF1645] font-poppins rounded "

                >
                  <div

                    onClick={() => setEnquiryForm({ status: true, id: projectId || '', count: 1 })}
                    className="flex items-center gap-2 w-fit h-[25px] sm:h-[28px] justify-center">
                    <div className="w-[18px] sm:w-[21px] h-[18px] sm:h-[21px] relative">
                      <PiNotePencil
                        className="w-[25px] h-[22px]"
                        color="#FF1645"
                      />
                    </div>
                    <label className="text-[12px] sm:text-[14.25px] text-nowrap text-[#FF1645] font-medium font-poppins">Enquire Now </label>
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
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
  containerClassName?: string;
}

function Content({ title, description, containerClassName, descriptionClassName, titleClassName }: ContentProps) {
  return (
    <div className={clsx('flex-1', containerClassName)}>
      <h2 className={clsx("text-lg font-bold mb-2", titleClassName)}>{title}</h2>
      <p className={clsx("text-[12px] text-[#333333] font-normal font-poppins whitespace-pre-line", descriptionClassName)}>{description}</p>
    </div>
  )
}
