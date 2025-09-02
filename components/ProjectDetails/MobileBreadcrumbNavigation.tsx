'use client'
import { back_to_black_icon, logoWebP, share_black_icon, wishlist_black_icon } from '@/app/assets'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { IoChevronBackOutline } from "react-icons/io5";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { PiShareFat } from "react-icons/pi";
import { handleShare } from '@/utils/shareOption'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { errorToast } from '../Toast'
import { useToggleWishlistItemMutation } from '@/redux/wishlist/wishlistApi'
import { LOCAL_STORAGE_KEYS } from '@/api/storage'
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle'
interface UserData {
    _id: string;
}
interface Props {
    projectTitle: string;
    projectId: string;
}

function MobileBreadcrumbNavigation({ projectTitle, projectId }: Props) {

    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const userDataString = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
        if (userDataString) {
            const userData: UserData = JSON.parse(userDataString);
            setUserId(userData._id);
        }
    }, []);

    const searchParams = useSearchParams();

    const router = useRouter();
    const goBack = () => {
        const currency = searchParams.get('currency');
     
        // Build query string with currency if available
        const queryString = currency ? `?currency=${currency}` : '';
        router.push(`/${queryString}`);
    }

    const handleShareFun = async (title: string) => {
        handleShare(title);
    }
    const [toggleWishlist] = useToggleWishlistItemMutation();

    const [isFavorite, setIsFavorite] = useState(false);

    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

    const isWishlist = wishlistItems?.find(item => item?.propertyDetails?._id === projectId);

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
            setIsFavorite((prev) => !prev);
        } catch (error) {
            console.error("Failed to toggle wishlist item:", error);
        }
    };

    return (
        <div className="flex justify-between px-5  sm:hidden py-3 h-[64px] w-full items-center">
            <div onClick={() => goBack()} className=" p-0 w-fit cursor-pointer rounded relative">
                {/* <Image
                    src={back_to_black_icon}
                    width={17}
                    height={17}
                    className="object-contain"
                    alt="back to"
                    /> */}
                <IoChevronBackOutline color='black' size={22} />
            </div>

            <div
                // onClick={() => window.location.href = "/"}
                className=" ms-12 h-full flex items-center  relative object-cover">

                {/* <Image
                    src={logoWebP}
                    className="w-full h-full"
                    alt="logo"
                    fill

                /> */}
                <MobileHeaderTitle
                content='Details'
                />
               
            </div>

            <div className="flex gap-1 items-center ">


                <div className="px-[10px] bg-transparent p-1  w-fit rounded relative">
                    {/* <Image
                    src={wishlist_black_icon}
                    width={20}
                    height={20}
                    className="object-contain"
                    alt="back to"
                    /> */}

                    {/* <GoHeart
                    color='black'
                    size={19}
                    /> */}

                    {isWishlist ? (
                        <GoHeart onClick={toggleWishlistItem} color="red" size={19} />
                    ) : (
                        <GoHeart onClick={toggleWishlistItem} color="black" size={19} />
                    )}

                </div>

                <div
                    onClick={() => handleShareFun(projectTitle)}
                    className=" w-fit rounded bg-transparent p-1 relative">

                    <PiShareFat
                        color='black'
                        size={20}
                    />
                </div>
            </div>


        </div>
    )
}



function HomePage(props: Props) {
    return (
        <Suspense>
            <MobileBreadcrumbNavigation {...props} />
        </Suspense>
    );
}

export default HomePage;