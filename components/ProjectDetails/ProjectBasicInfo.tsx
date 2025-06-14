'use client'
import { LOCAL_STORAGE_KEYS } from "@/api/storage";
import { bath_icon, bed_icon, location_icon, save_icon, share_button_icon } from "@/app/assets";
import Typography from "@/components/atom/typography/Typography";
import PrimaryButton from "@/components/Buttons";
import { errorToast } from "@/components/Toast";
import { RootState } from "@/redux/store";
import { useToggleWishlistItemMutation, useViewAllWishlistsQuery } from "@/redux/wishlist/wishlistApi";
import { setWishlist } from "@/redux/wishlistSlice/wishlistSlice";
import { handleShare } from "@/utils/shareOption";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoHeart, GoHeartFill, GoScreenFull } from "react-icons/go";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { LiaBedSolid } from "react-icons/lia";
import { PiShareFat } from "react-icons/pi";
import { TfiLocationPin } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";

interface UserData {
  _id: string;
}


const ProjectBasicInfo = ({ projectId, type,
  title, address, propertyType, beds, baths, currency, value, squareFeet, projectType, discount, totalFloors
}: {
  projectType?: string;
  title?: string,
  address?: string,
  propertyType: string,
  beds?: string,
  baths?: string,
  currency: string,
  value: string,
  squareFeet: string
  projectId: string
  discount: string
  type: string
  totalFloors?: string
}) => {

  const [toggleWishlist] = useToggleWishlistItemMutation();

  const [userId, setUserId] = useState<string | null>(null);


  useEffect(() => {
    const userDataString = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
    if (userDataString) {
      const userData: UserData = JSON.parse(userDataString);
      setUserId(userData._id);
    }
  }, []);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);


  const toggleWishlistItem = async () => {

    if (!userId) {
      errorToast("Please login to favorite this project");
      return;
    };

    const data = {
      projectId: projectId,
      userId: userId
    };

    try {
      await toggleWishlist(data).unwrap();
    } catch (error: any) {
      console.error("Failed to toggle wishlist item:", error);
      errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');

    }
  };

  const { data: wishlistDataItem } = useViewAllWishlistsQuery(
    { userId: userId! }, // assert it's non-null
    { skip: !userId }     // make sure it's skipped if null
  );

  const isWishlist = wishlistItems?.find(item => item?.propertyDetails?._id === projectId);
  const dispatch = useDispatch();


  useEffect(() => {
    if (wishlistDataItem?.data) {
      dispatch(setWishlist(wishlistDataItem?.data))
      // setWishlistData(wishlistDataItem?.data)
    }


  }, [wishlistDataItem]);

  const isProject = (projectType === 'commercial-residential' || projectType === 'project-residential' || projectType === 'project-commercial')


  return (
    <div className="flex w-full justify-between mt-[9.75px]">
      <div className=" w-full">


        <div className="flex justify-start items-center">
          {title ? <h3 className="text-[21.3px] capitalize sm:text-[26.25px] text-[#333333] font-medium font-poppins ">{title}</h3> : <div className=" w-full h-[40px] me-2 rounded bg-gray-50"></div>}


          {discount && (
            <span className="bg-[#44B842] ms-3 rounded-[2px] text-white text-[12px] font-normal font-poppins px-2 py-0.5 capitalize w-fit hidden sm:flex">
              {discount} Discount
            </span>
          )}
        </div>
        {/* Price */}
        {(value !== '0' && currency) ?
          isProject ?

            <h4>

              {<>
                <span className='text-[12px] sm:text-[24px] mt-[4.5px] font-semibold font-poppins'>Starting From</span>

                <span className='font-poppins sm:text-[33.75px] text-[30px] ms-1 font-semibold '>
                  {value}
                </span>
                <span className='text-[11.928px] sm:text-[24px] font-semibold mt-[4.5px] font-poppins '>{currency}</span>
              </>}

            </h4> : <h4>
              <span className='text-[12px] sm:text-[17.75px] mt-[4.5px] font-semibold font-poppins '>{currency}</span>
              <span className='font-poppins sm:text-[33.75px] text-[30px] ms-1 font-semibold '>
                {value}
              </span>
            </h4> : <div className="  sm:max-w-[400px] w-full h-[47px] mt-3 rounded bg-gray-50"></div>


        }


        {/* {(projectType === 'commercial-residential' || projectType === 'project-residential' || projectType === 'project-commercial') ?
          <h4>

            {(value && currency) ? <>
              <span className='text-[12px] sm:text-[24px] mt-[4.5px] font-semibold font-poppins'>Starting From</span>

              <span className='font-poppins sm:text-[33.75px] text-[30px] ms-1 font-semibold '>
                {value}
              </span>
              <span className='text-[11.928px] sm:text-[24px] font-semibold mt-[4.5px] font-poppins '>{currency}</span>
            </> : <div className=" w-full h-[40px] bg-gray-50"></div>}

          </h4> :
          <h4>
            <span className='text-[12px] sm:text-[17.75px] mt-[4.5px] font-semibold font-poppins '>{currency}</span>
            <span className='font-poppins sm:text-[33.75px] text-[30px] ms-1 font-semibold '>
              {value}
            </span>
          </h4>
        } */}




        {/* Location place */}
        <div className="flex items-center mt-[7.6px] m:mt-[13.5px] w-full gap-1">
          {/* <Image src={location_icon} alt="location" width={15} height={15} /> */}
          {address ? <>
            <div className="">
              <TfiLocationPin size={18} color='#333333' />
            </div>
            <p className="capitalize text-[12px] font-normal font-poppins line-clamp-2">{address}</p>
          </> :
            <p className="h-[30px] w-full bg-gray-50 rounded-[3px] flex items-center justify-center" />
          }
        </div>

        {/* Property Type */}
        <div className="flex flex-wrap sm:flex-nowrap mt-[12.75px] items-center gap-3">
          {propertyType ? <p className="capitalize font-medium font-poppins text-[12px]">{propertyType}</p> :
            <div className="w-full max-w-[100px] h-[25px] rounded bg-gray-50"></div>
          }          <div className="h-[18px] w-[1px] bg-[#333333]" />
          {!(propertyType === 'land-residential' || propertyType === 'land-commercial') && <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {/* <Image src={bed_icon} alt="bed icon" width={20} height={20} className="object-cover" /> */}
              {/* <p className="text-sm font-light font-poppins">{item.numberOfBeds}</p> */}

              {type ? <> <Typography
                tag='p'
                className='text-[12px] text-nowrap font-light font-poppins'
                text={type}
              />
                <LiaBedSolid size={20} color='#333' />
              </> : <p className="h-[25px] w-[80px] bg-gray-50 rounded" />
              }
            </div>


            {/* <div className="flex items-center gap-2"> */}
            {/* <Image src={bath_icon} alt="bath icon" width={20} height={20} className="object-cover" /> */}
            {/* <p className="text-sm font-light font-poppins">{item.numberOfBath}</p> */}
            {/* <Typography
                tag='p'
                className='text-[12px] text-nowrap font-light font-poppins'
                text={`Bathrooms: ${baths}`}
              />*/}

            {/* </div>  */}
          </div>}
          {!(propertyType === 'land-residential' || propertyType === 'land-commercial') && <div className="h-[18px] w-[1px] bg-[#333333]" />}
          <div className="flex items-center gap-3">

            <div className="flex items-center gap-2">
              {/* <Image src={bath_icon} alt="bath icon" width={20} height={20} className="object-cover" /> */}
              {totalFloors ? <>
                <HiOutlineBuildingOffice
                  color='#333'
                  className='w-[18px] h-[18px]'
                />
                {/* <p className="text-sm font-light font-poppins">{item.squareFeet} </p> */}
                <Typography
                  tag='p'

                  className='text-[12px] font-light font-poppins'
                  text={`${totalFloors} floors`}
                />
              </>
                :
                <div className="w-[100px] h-[25px] rounded bg-gray-50"></div>
              }

            </div>
          </div>
        </div>
      </div>

      {/* share and wishlist option here */}
      <div className="sm:flex hidden gap-[6px] h-10">
        <PrimaryButton
          type="button"
          className="bg-[#FFE7EC] border-none text-[#FF1645] font-poppins rounded "

        >
          <div className="flex items-center  justify-center gap-2">
            {isWishlist ? (
              <GoHeartFill onClick={toggleWishlistItem} color="red" className="w-[20px] h-[20px]" />
            ) : (
              <GoHeart onClick={toggleWishlistItem} color="red" className="w-[20px] h-[20px]" />
            )}
            <label className="text-[14.25px] text-[#FF1645] font-medium font-poppins">Save</label>
          </div>
        </PrimaryButton>

        <PrimaryButton
          onClick={() => handleShare(title)}
          type="button"
          className="bg-[#FFE7EC] border-none text-[#FF1645] font-poppins rounded "

        >
          <div className="flex items-center gap-2 justify-center">
            <PiShareFat
              color="red"
              className="w-[20px] h-[20px]"
            />
            {/* <Image src={share_button_icon} alt="share icon" width={21.75} height={21.75} /> */}
            <label className="text-[14.25px] text-[#FF1645] font-medium font-poppins">Share </label>
          </div>
        </PrimaryButton>
      </div>
    </div>
  );
}


export default ProjectBasicInfo
