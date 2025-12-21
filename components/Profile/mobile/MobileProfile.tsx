"use client";

import CallIcon from "../../../public/profileIcons/callIcon.svg";
import MailIcon from "../../../public/profileIcons/messageIcon.svg";
import Pencil from "../../../public/profileIcons/Editpen.svg";
import Saved from "../../../public/profileIcons/savedIcon.svg";
import EnquiredProperty from "../../../public/profileIcons/enqryIcon.svg";
import PurchaseHistory from "../../../public/profileIcons/PurchaseHistoryIcon.svg";
import ChangePassword from "../../../public/profileIcons/changePasswordIcon.svg";
import Rating from "../../../public/profileIcons/RatetheAppIcon.svg";
import TileDeed from "../../../public/profileIcons/TitleDeedIcon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StaticImageData } from "next/image";
import { UserProfile } from "@/types/profile/mobile/profileType";
type ProfileAction = {
  label: string;
  icon: StaticImageData;
  count?: number;
  highlight?: boolean;
};

type MobileProfilePageProps = {
  profile: UserProfile;
};

function MobileProfilePage({ profile }: MobileProfilePageProps) {
  const router = useRouter();

  console.log('the mobileProfiledata :',profile)

  const actions: ProfileAction[] = [
    {
      label: "Saved Properties",
      icon: Saved,
      count: 5,
    },
    {
      label: "Enquired Properties",
      icon: EnquiredProperty,
    },
    {
      label: "Purchase History",
      icon: PurchaseHistory,
      count: 1,
    },
    {
      label: "Change Password",
      icon: ChangePassword,
    },
    {
      label: "Rate the App",
      icon: Rating,
    },
    {
      label: "Title Deed",
      icon: TileDeed,
    },
  ];

  return (
    <main className="px-4 py-6 font-poppins bg-white min-h-screen">
      {/* Greeting */}
      <h1 className="text-xl font-semibold mb-4">
        Hello, <span className="font-bold">{profile?.name}</span>
      </h1>

      {/* Personal Info */}
      <section className="border border-gray-200 rounded-xl p-4 mb-6 relative">
        <h2 className="text-sm font-medium mb-3">My Personal Info</h2>

        <div className="space-y-2 text-sm font-semibold text-black">
          <div className="flex items-center gap-2">
            <Image src={MailIcon} alt="Mail Icon" width={16} height={16} />
            <span>{profile?.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <Image src={CallIcon} alt="Call Icon" width={16} height={16} />
            <span>{profile?.number}</span>
          </div>
        </div>

        {/* Edit */}
        <button
          onClick={() => router.push("/edit-profile")}
          className="absolute top-4 right-4 p-2 rounded-full
                     transition-transform duration-200 ease-out
                     hover:scale-110 active:scale-95"
        >
          <Image src={Pencil} alt="Edit profile" width={16} height={16} />
        </button>
      </section>

      {/* Action Grid */}
      <section className="grid grid-cols-2 gap-4">
        {actions.map((item, index) => (
          <div
            key={index}
            className="relative border border-gray-200 rounded-xl py-3.5 px-3.5 flex flex-col items-start gap-2.5"
          >
            <Image src={item.icon} alt={item.label} width={20} height={20} />

            <span className="text-sm font-medium text-gray-800">
              {item.label}
            </span>

            {item.count !== undefined && (
              <span className="absolute top-3 right-3 text-xs text-gray-500">
                {item.count}
              </span>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}

export default MobileProfilePage;