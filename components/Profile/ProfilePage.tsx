"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RootState } from "@/redux/store";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IUser, useFetchUserProfileDetailsQuery } from "@/redux/auth/authApi";
import { FaTrash } from "react-icons/fa";
import PrimaryButton from "@/components/Buttons";
import Container from "@/components/atom/Container/Container";
import { IoIosLogOut } from "react-icons/io";
import { GoHeart } from "react-icons/go";
import { PiNotePencil } from "react-icons/pi";
import { VscHistory } from "react-icons/vsc";
import SectionDivider from "@/components/atom/SectionDivider/SectionDivider";
import { errorToast } from "@/components/Toast";
import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "@/redux/slices/userSlice/userSlice";
import { useUserLocalStorage } from "@/app/useUserLocalStorage";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { LOCAL_STORAGE_KEYS } from "@/api/storage";
import Link from "next/link";
import MobileHeaderTitle from "../atom/typography/MobileHeaderTitle";
import MobileProfilePage from "./mobile/MobileProfile";

function ProfilePageComponent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthentication, user } = useSelector(
    (state: RootState) => state.user
  );

  const { clearUserData } = useUserLocalStorage();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  const { data: fectchedUserProfileDetails } =
    useFetchUserProfileDetailsQuery();
  // Inside your component
  useAuthRedirect();

  useEffect(() => {
    if (fectchedUserProfileDetails) {
      setUserData(fectchedUserProfileDetails.user);
    }
  }, [fectchedUserProfileDetails]);

  console.log('the profile data is here :',userData)

  // 🖼 Preview image on file select
  useEffect(() => {
    if (!selectedImage) return;
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

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
    if (typeof window !== "undefined") {
      const confirmed = window.confirm("Logout?");
      if (!confirmed) return;
    }

    try {
      dispatch(logoutStart());
      clearUserData();
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_DATA);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
      sessionStorage.clear();

      dispatch(logoutSuccess());
      window.location.href = "/login";
    } catch (error: any) {
      dispatch(logoutFailure(error));
      errorToast(
        error?.response?.data?.message ||
          error?.data?.message ||
          error?.response?.message ||
          error?.message ||
          "Error occurred, please try again later"
      );
    }
  };

  return (
    <main>
      <div className="w-full font-[family-name:var(--font-geist-sans)]">
        <div className="block md:hidden">
          {userData && <MobileProfilePage profile={userData}/>}
        </div>
        <div className="hidden md:block">
          <Header
            logoSection={
              <div className="h-full w-full flex justify-center items-center">
                <MobileHeaderTitle content="Profile" />
              </div>
            }
          />
        </div>

        <div className="hidden md:block">
          <SectionDivider
            containerClassName="mt-[10.5px] mb-[12px]"
            lineClassName="h-[1px] w-full bg-[#DEDEDE]"
          />
        </div>

        <div className="hidden md:block">
          <Container>
            <div className="min-h-[90vh] flex justify-center  flex-col  items-center md:items-start ">
              <p className="text-[28.5px] font-poppins font-medium">
                Your Profile
              </p>

              <div className="bg-red-40 sm:flex-row flex-col  sm:gap-[19.5px] flex justify-center items-center ">
                <div className="flex flex-col relative items-center gap-2">
                  {newAvatar && (
                    <button
                      onClick={handleClearAvatar}
                      className="text-sm absolute right-0 top-0 z-30 text-red-500 underline hover:text-red-600"
                    >
                      <FaTrash color="red" size={14} />
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
                    ) : isAuthentication && user?.avatar?.webp?.url ? (
                      <div className="rounded-full relative w-[70px] h-[70px] overflow-hidden border-[#DEDEDE] bg-[#E4E4E4] flex justify-center items-center">
                        <Image
                          src={user.avatar.webp?.url}
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

                <div className="flex cursor-pointer flex-col mt-[9px] sm:mt-0 items-center h-full  justify-center sm:items-start">
                  <p className="font-poppins sm:text-[20.25px] text-[16px]">
                    {userData?.name}
                  </p>
                  <div
                    onClick={handleLogout}
                    className="flex text-[8px] sm:text-[12px] gap-[9px] font-medium font-poppins items-center justify-center mt-[1px]"
                  >
                    <IoIosLogOut size={16} color="#FF1645" />
                    <p>Logout</p>
                  </div>
                </div>
              </div>

              {/* {newAvatar && (
                            <PrimaryButton
                                onClick={handleImageUpload}
                                disabled={isUploading}
                                type="button"
                                className="cursor-pointer bg-[#FFE7EC] disabled:!bg-[#FFE7EC]/60 max-w-[200px] mt-3 h-[30px] w-full border-none "
                            >
                                <div className="cursor-pointer flex justify-center items-center gap-2">
                                    <label className="cursor-pointer text-nowrap font-medium text-[#FF1645] text-[13px] font-poppins">{isUploading ? 'Uploading...' : 'Update'}</label>
                                </div>
                            </PrimaryButton>
                        )} */}

              <div className="grid grid-cols-2 sm:mt-[28px] mt-[16px] sm:grid-cols-3 gap-[8.25px]  items-center justify-start">
                <Link href={"/saved-properties"} className="">
                  <div className=" gap-[9.75px] rounded-[3.75px] px-[16px] h-[37.5px] flex justify-center items-center bg-[#E4E4E4]">
                    <GoHeart color="#FF1645" size={19} />
                    <p className="font-poppins font-medium text-[10.5px] sm:text-[12.75px] ">
                      Saved Properties
                    </p>
                  </div>
                </Link>

                <Link href={"/enquired-properties"}>
                  <div className=" gap-[9.75px] rounded-[3.75px] px-[16px] h-[37.5px] flex justify-center items-center bg-[#E4E4E4]">
                    <PiNotePencil color="#FF1645" size={19} />
                    <p className="font-poppins font-medium text-[10.5px] text-nowrap sm:text-[12.75px] ">
                      Enquired Properties
                    </p>
                  </div>
                </Link>

                <div className=" gap-[9.75px] col-span-2 sm:col-span-1 rounded-[3.75px] px-[16px] h-[37.5px] flex justify-center items-center bg-[#E4E4E4]">
                  <VscHistory color="#FF1645" size={19} />
                  <p className="font-poppins font-medium text-[10.5px] sm:text-[12.75px] ">
                    Purchase History
                  </p>
                </div>
              </div>

              <div className="pt-[16px] sm:pt-[28px] pb-0 m-0 max-w-[372.75px] w-full">
                <p className="font-poppins font-medium text-[14px] sm:text-[21px]">
                  Personal Details
                </p>

                <div className="mt-[12.75px] flex flex-col gap-[7.5px] font-poppins">
                  <label className=" text-[12px] font-poppins sm:text-[14px]  font-medium">
                    Name
                  </label>
                  <div className="border w-full outline-none border-[#ede7e7] rounded-[3px] px-[16px] font-poppins text-[12px] sm:text-[13.5px] flex justify-start items-center font-normal bg-white text-black h-[45px]">
                    {userData?.name}
                  </div>
                </div>

                <div className="mt-[12.75px] flex flex-col gap-[7.5px] font-poppins">
                  <label className=" text-[12px] font-poppins sm:text-[14px]  font-medium">
                    Email
                  </label>
                  <div className="border w-full outline-none border-[#ede7e7] rounded-[3px] px-[16px] font-poppins text-[12px] sm:text-[13.5px] flex justify-start items-center font-normal bg-white text-black h-[45px]">
                    {userData?.email}
                  </div>
                </div>
              </div>

              <div className="flex cursor-pointer gap-[8.25px] max-w-[372.75px] w-full items-center justify-start mt-[12.75px]">
                <PrimaryButton
                  onClick={() => router.push("/edit-profile")}
                  type="button"
                  className=" bg-[#FFE7EC] cursor-pointer h-[38px] w-full border-none "
                >
                  <div className="flex justify-center cursor-pointer items-center gap-2">
                    <label className=" text-nowrap cursor-pointer font-medium text-[#FF1645] text-[13px] font-poppins">
                      Edit Profile Details
                    </label>
                  </div>
                </PrimaryButton>

                <PrimaryButton
                  onClick={() => router.push("/profile/change-password")}
                  type="button"
                  className="cursor-pointer bg-[#FFE7EC] h-[38px] w-full border-none "
                >
                  <div className="flex cursor-pointer justify-center items-center gap-2">
                    <label className="text-nowrap cursor-pointer font-medium text-[#FF1645] text-[13px] font-poppins">
                      Change Password
                    </label>
                  </div>
                </PrimaryButton>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default function ProfilePage() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <ProfilePageComponent />
    </Suspense>
  );
}
