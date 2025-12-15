"use client";

import { motion } from "framer-motion";
import { GalleryTab, GalleryTabItem } from "../types/types";
import { GoChevronLeft } from "react-icons/go";
import clsx from "clsx";
import Title from "./Title";

interface Props {
    title: string;
    onBack?: () => void;
}

export default function LayoutHeaderUI({
    title,
    onBack,
}: Props) {
    return (
        <div className="flex px-3 items-center gap-3 py-3 bg-white">

            <div
                className="w-10 h-10 rounded-full border border-[#DEDEDE] flex items-center justify-center"

            >
                <GoChevronLeft
                    size={24}
                    onClick={onBack}
                />
            </div>

            {/* Tabs */}
            <div className="flex flex-1 justify-center items-center gap-0 ">
               <Title
               title={title}
               />
            </div>
        </div>
    );
}
