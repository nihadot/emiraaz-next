import { save_icon, share_button_icon } from "@/app/assets";
import PrimaryButton from "@/components/Buttons";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
    currency: string
    value: string;
    title: string;
}
const StickyScrollHeader = ({ value, currency, title }: Props) => {
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    setShowHeader(scrollY > 800);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {showHeader && (
                <div className="fixed hidden md:block top-0 left-0 w-full bg-white shadow-md z-50 transition-all duration-300">
                    <div className="px-5 flex items-center justify-between  lg:px-8 xl:px-24 text-black font-semibold text-center">
                        <div className="flex flex-col items-start justify-start py-3">
                            <h3 className="text-[18px] font-medium font-poppins ">{title}</h3>
                            <h4 className='text-[18px] font-poppins  font-semibold'>
                                <span className="text-[12px] font-semibold font-poppins">{currency}</span> {value}
                            </h4>
                        </div>
                        <div className="flex gap-3 h-10">

                            <PrimaryButton
                                type="button"
                            
                            >

<div className="flex items-center gap-2">
                                        <Image src={save_icon} alt="save icon" width={21} />
                                        <label className="text-sm font-light text-[#FF1645] font-poppins">Save</label>
                                    </div>
                            </PrimaryButton>
                            <PrimaryButton
                                type="button"
                                className="bg-[#FFE7EC] border-none text-[#FF1645] font-poppins rounded "
                               
                            >

<div className="flex items-center gap-2">
                                        <Image src={share_button_icon} alt="share icon" width={21} />
                                        <label className="text-sm font-light text-[#FF1645] font-poppins">Share </label>
                                    </div>
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StickyScrollHeader;
