"use client";

import { motion } from "framer-motion";
import { GalleryTab, GalleryTabItem } from "../types/types";
import { GoChevronLeft } from "react-icons/go";
import clsx from "clsx";

interface Props {
    tabs: GalleryTabItem[];
    activeTab: GalleryTab;
    onTabClick: (tab: GalleryTab) => void;
    onBack?: () => void;
}

export default function GalleryHeaderUI({
    tabs,
    activeTab,
    onTabClick,
    onBack,
}: Props) {
    return (
        <div className="flex px-3 items-center gap-0 py-3 bg-white">

            <div
                className="w-10 me-2 h-10 rounded-full border border-[#DEDEDE] flex items-center justify-center"

            >
                <GoChevronLeft
                    size={24}
                    onClick={onBack}
                />
            </div>

            {/* Tabs */}
            <div className="flex flex-1 gap-0 overflow-x-auto no-scrollbar">
                {tabs.map(tab => {
                    const isActive = tab.id === activeTab;

                    return (
                        <motion.button
                            key={tab.id}
                            onClick={() => onTabClick(tab.id)}
                            whileTap={{ scale: 0.95 }}
                            className={clsx(
                                `
      flex items-center gap-2  py-3 rounded-lg
      text-xs w-full font-poppins font-normal whitespace-nowrap
      ${isActive ? "bg-gray-100 text-black" : "text-gray-500"}
    `,
                                {
                                    "px-14":
                                        activeTab === "description-arabic" ||
                                        activeTab === "description-english",
                                    "px-5":
                                        activeTab !== "description-arabic" &&
                                        activeTab !== "description-english",
                                }
                            )}
                        >
                            {tab.icon && <div className="">
                                {tab.icon}
                            </div>}
                            <span>
                                {tab.label}
                                {tab.count !== undefined && ` (${tab.count})`}
                            </span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
