'use client'
import React, { use, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { RootState } from '@/redux/store'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useEditProfileMutation } from '@/redux/auth/authApi'
import { useCloudinaryUpload } from '@/utils/cloudinary/useCloudinaryUpload'
import { FolderName } from '@/redux/types'
import { FaTrash } from 'react-icons/fa'
import PrimaryButton from '@/components/Buttons'
import Container from '@/components/atom/Container/Container'
import { IoIosLogOut } from "react-icons/io";
import { GoHeart } from "react-icons/go";
import { PiNotePencil } from "react-icons/pi";
import { VscHistory } from "react-icons/vsc";
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import { errorToast } from '@/components/Toast'
import { isUserLoad } from '@/redux/userSlice/userSlice'
import { logoutFailure, logoutStart, logoutSuccess } from '@/redux/slices/userSlice/userSlice'
import { useUserLocalStorage } from '@/app/useUserLocalStorage'

function ProfilePage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { ready, isAuthentication, user } = useSelector((state: RootState) => state.user);

    const { uploadImage } = useCloudinaryUpload();
    const [editProfile] = useEditProfileMutation();
    const { localUser, updateLocalUser, clearUserData } = useUserLocalStorage();

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [newAvatar, setNewAvatar] = useState<File | null>(null);

    // 🚀 Redirect on auth or missing local user
    useEffect(() => {
        if (ready && !isAuthentication) {
            router.push('/login');
        }

        if (ready && !localUser) {
            router.push('/login');
        }
    }, [ready, isAuthentication, localUser]);

    // 🖼 Preview image on file select
    useEffect(() => {
        if (!selectedImage) return;
        const objectUrl = URL.createObjectURL(selectedImage);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedImage]);

    // 📤 Upload handler
    const handleImageUpload = async () => {
        if (!newAvatar) return;

        try {
            setIsUploading(true);
            const uploadedImage = await uploadImage(newAvatar, FolderName.Users);

            if (uploadedImage) {
                const payload = { avatar: uploadedImage };
                await editProfile(payload).unwrap();

                const updatedUser = {
                    ...localUser,
                    avatar: uploadedImage,
                };

                updateLocalUser(updatedUser);
                dispatch(isUserLoad({ user: updatedUser }));
            } else {
                errorToast('Image upload failed.');
            }
        } catch (err) {
            console.error('Upload error:', err);
            errorToast('Failed to upload image.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = e.target.files?.[0];
        if (file && file.size > 512000) {
            errorToast("Please upload an image smaller than 500KB.");
            return;
        }
        setNewAvatar(file);
    };

    const handleClearAvatar = () => {
        setNewAvatar(null);
    };

    const handleLogout = async () => {
        if (typeof window !== 'undefined') {
            const confirmed = window.confirm('Logout?');
            if (!confirmed) return;
        }

        try {
            dispatch(logoutStart());
            clearUserData();
            dispatch(logoutSuccess());
            router.push("/login");
        } catch (error: any) {
            dispatch(logoutFailure(error));
            errorToast(
                error?.response?.data?.message ||
                error?.data?.message ||
                error?.response?.message ||
                error?.message ||
                'Error occurred, please try again later'
            );
        }
    };

    return (
        <main>
            <div className="w-full font-[family-name:var(--font-geist-sans)]">
                <Header />

                <SectionDivider
                    containerClassName="mt-[10.5px] mb-[12px]"
                    lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                />

                <Container>

                    <div className="min-h-[90vh] flex justify-center  flex-col  items-center md:items-start ">

                        <p className='text-[28.5px] font-poppins font-medium'>
                            Your Profile
                        </p>

                        <div className="bg-red-40 sm:flex-row flex-col  sm:gap-[19.5px] flex justify-center items-center w-[200px]">


                            <div className="flex flex-col relative items-center gap-2">

                                {newAvatar && (
                                    <button
                                        onClick={handleClearAvatar}
                                        className="text-sm absolute right-0 top-0 z-30 text-red-500 underline hover:text-red-600"
                                    >
                                        <FaTrash color='red' size={14} />
                                    </button>
                                )}

                                <label htmlFor="avatarUpload" className="cursor-pointer">
                                    {newAvatar ? (
                                        <div className="rounded-full relative w-[70px] h-[70px] overflow-hidden border-[#DEDEDE] bg-[#E4E4E4] flex justify-center items-center">
                                            <Image
                                                src={URL.createObjectURL(newAvatar)}
                                                alt="preview avatar"
                                                fill
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                    ) : isAuthentication && user?.avatar?.secure_url ? (
                                        <div className="rounded-full relative w-[70px] h-[70px] overflow-hidden border-[#DEDEDE] bg-[#E4E4E4] flex justify-center items-center">
                                            <Image
                                                src={user.avatar.secure_url}
                                                alt="user avatar"
                                                fill
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="rounded-full w-[70px] h-[70px] bg-[#E4E4E4] border-[#DEDEDE] flex justify-center items-center">
                                            {/* Optional: Default icon or initials */}
                                        </div>
                                    )}
                                </label>

                                <input
                                    id="avatarUpload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />




                            </div>





                            <div className="flex flex-col mt-[9px] sm:mt-0 items-center h-full justify-center sm:items-start">
                                <p className='font-poppins sm:text-[20.25px] text-[16px]'>Jhon Doe</p>
                                <div onClick={handleLogout} className="flex text-[8px] sm:text-[12px] gap-[9px] font-medium font-poppins items-center justify-center mt-[1px]">
                                    <IoIosLogOut size={16} color='#FF1645' />
                                    <p>Logout</p>
                                </div>
                            </div>
                        </div>


                        {newAvatar && (
                            <PrimaryButton
                                onClick={handleImageUpload}
                                disabled={isUploading}
                                type="button"
                                className=" bg-[#FFE7EC] disabled:!bg-[#FFE7EC]/60 max-w-[200px] mt-3 h-[30px] w-full border-none "
                            >
                                <div className="flex justify-center items-center gap-2">
                                    <label className=" text-nowrap font-medium text-[#FF1645] text-[13px] font-poppins">{isUploading ? 'Uploading...' : 'Update'}</label>
                                </div>
                            </PrimaryButton>
                        )}


                        <div className="grid grid-cols-2 sm:mt-[28px] mt-[16px] sm:grid-cols-3 gap-[8.25px]  items-center justify-start">
                            <div className=" gap-[9.75px] rounded-[3.75px] px-[16px] h-[37.5px] flex justify-center items-center bg-[#E4E4E4]">
                                <GoHeart color='#FF1645' size={19} />
                                <p className='font-poppins font-medium text-[10.5px] sm:text-[12.75px] '>Wishlist Properties</p>

                            </div>



                            <div className=" gap-[9.75px] rounded-[3.75px] px-[16px] h-[37.5px] flex justify-center items-center bg-[#E4E4E4]">
                                <PiNotePencil color='#FF1645' size={19} />
                                <p className='font-poppins font-medium text-[10.5px] text-nowrap sm:text-[12.75px] '>Enquired Properties</p>

                            </div>

                            <div className=" gap-[9.75px] col-span-2 sm:col-span-1 rounded-[3.75px] px-[16px] h-[37.5px] flex justify-center items-center bg-[#E4E4E4]">
                                <VscHistory color='#FF1645' size={19} />
                                <p className='font-poppins font-medium text-[10.5px] sm:text-[12.75px] '>Purchase History</p>

                            </div>
                        </div>


                        <div className="pt-[16px] sm:pt-[28px] pb-0 m-0 max-w-[372.75px] w-full">
                            <p className='font-poppins font-medium text-[14px] sm:text-[21px]'>Personal Details</p>

                            <div className='mt-[12.75px] flex flex-col gap-[7.5px] font-poppins'>
                                <label className=' text-[12px] font-poppins sm:text-[14px]  font-medium'>Name</label>
                                <div
                                    className="border w-full outline-none border-[#ede7e7] rounded-[3px] px-[16px] font-poppins text-[12px] sm:text-[13.5px] flex justify-start items-center font-normal bg-white text-black h-[45px]"
                                >
                                    {user?.name}
                                </div>
                            </div>

                            <div className='mt-[12.75px] flex flex-col gap-[7.5px] font-poppins'>
                                <label
                                    className=' text-[12px] font-poppins sm:text-[14px]  font-medium'>Email</label>
                                <div
                                    className="border w-full outline-none border-[#ede7e7] rounded-[3px] px-[16px] font-poppins text-[12px] sm:text-[13.5px] flex justify-start items-center font-normal bg-white text-black h-[45px]"
                                >
                                    {user?.email}
                                </div>
                            </div>

                        </div>



                        <div className="flex cursor-pointer gap-[8.25px] max-w-[372.75px] w-full items-center justify-start mt-[12.75px]">
                            <PrimaryButton
                                onClick={() => router.push('/edit-profile')}
                                type="button"
                                className=" bg-[#FFE7EC] cursor-pointer h-[38px] w-full border-none "
                            >
                                <div className="flex justify-center cursor-pointer items-center gap-2">
                                    <label className=" text-nowrap font-medium text-[#FF1645] text-[13px] font-poppins">Edit Profile Details</label>
                                </div>
                            </PrimaryButton>


                            <PrimaryButton
                                onClick={() => router.push('/change-password')}
                                type="button"
                                className="cursor-pointer bg-[#FFE7EC] h-[38px] w-full border-none "
                            >
                                <div className="flex cursor-pointer justify-center items-center gap-2">
                                    <label className="text-nowrap font-medium text-[#FF1645] text-[13px] font-poppins">Change Password</label>
                                </div>
                            </PrimaryButton>
                        </div>



                    </div>
                </Container>

            </div>
            <Footer />
        </main>
    )
}

export default ProfilePage
