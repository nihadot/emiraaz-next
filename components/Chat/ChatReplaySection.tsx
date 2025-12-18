"use client";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface ChatMessage {
    answer: string | any;
    prompt: string;
}

interface ChatReplaySectionProps {
    data: {
        conversations: ChatMessage[];
    };
    small?: boolean;
    isLoading: boolean;
}

export function ChatReplaySection({ data, isLoading, small }: ChatReplaySectionProps) {
    const topRef = useRef<HTMLDivElement>(null);
    const dataSet = data?.conversations || [];

    useEffect(() => {
        if (topRef.current) {
            topRef.current.scrollTo({
                top: topRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [dataSet, isLoading]); // Changed from dataSet.length to dataSet to handle streaming updates

    const bottomRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [dataSet]);

    console.log(dataSet,'dataSet')
    return (
        <div className="flex flex-col gap-2 pt-4 ps-2" ref={topRef}>
            {dataSet?.map((item: any, index: number) => {
                return (
                    <div
                        key={index}
                        className={clsx("text-black flex-col flex w-full")}
                    >
                        {/* User Message */}
                        <div className={clsx(
                            "flex relative ml-auto mt-2 bg-red-600/10 w-fit justify-end",
                            small ? "px-2 py-2 rounded-[4px]" : "px-3 py-3 rounded-md"
                        )}>
                            <p className={clsx(
                                "text-gray-600 text-end text-sm",
                                small ? "text-xs" : "text-sm"
                            )}>
                                {item?.prompt}
                            </p>

                            <div className="absolute -right-2 bottom-1.5 w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-red-50"></div>
                        </div>

                        {/* Loading Indicator - Show when answer is null */}
                        {item.answer === null && (
                            <div className={clsx("flex gap-2  my-2 relative  w-fit rounded-md pt-2 border border-[#DEDEDE] bg-white",
                                small ? "p-2" : "py-3 px-3"
                            )}>
                                <div className="dot"></div>
                                <div className="dot delay-1"></div>
                                <div className="dot delay-2"></div>
                                <div className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-[#DEDEDE]"></div>
                            </div>
                        )}

                        {/* String Answer */}
                        {typeof item.answer === "string" && item.answer && (
                            <div className={clsx(
                                "flex bg-white mt-2 w-fit border border-[#DEDEDE] relative",
                                small ? "rounded-[4px]" : "rounded-md"
                            )}>
                                <p className={clsx(
                                    "text-black font-poppins font-normal",
                                    small ? "text-xs py-2 px-2" : "text-sm py-3 px-3"
                                )}>
                                    {item.answer}
                                </p>
                                <div className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-[#DEDEDE]"></div>
                            </div>
                        )}

                        {/* Message Answer */}
                        {item.answer?.message && (
                            <div className={clsx(
                                "flex bg-white mt-2 relative w-fit border border-[#DEDEDE]",
                                small ? "rounded-[4px]" : "rounded-md"
                            )}>
                                <p className={clsx(
                                    "text-black font-poppins font-normal",
                                    small ? "text-xs py-2 px-2" : "text-sm py-3 px-3"
                                )}>
                                    {item.answer.message}
                                </p>
                                <div className={clsx("absolute -left-2  w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-[#DEDEDE]",{
                                    'top-4' : !small,
                                    'top-3' : small
                                })}></div>
                            </div>
                        )}

                        {/* Array Answer (Property Results) */}
                        {!item.answer?.message &&
                            Array.isArray(item.answer) &&
                            item.answer.map((ans: any, i: number) => (
                                <div
                                    key={i}
                                    className="flex relative px-3 py-3 bg-white mt-2 rounded-md border border-[#DEDEDE] w-fit"
                                >
                                    <div className="flex flex-col gap-1">
                                        <p className="text-black text-lg font-medium font-poppins">{ans?.projectTitle}</p>
                                        <p className="text-black text-sm">
                                            <span className="font-medium">Price : </span>AED {ans?.priceInAED}
                                        </p>
                                        <p className="text-black text-sm">
                                            <span className="font-medium">Size : </span>{ans?.squareFeet} Sqft
                                        </p>

                                        <p className="text-black text-sm">
                                            <span className="font-medium">Features : </span>
                                            {(() => {
                                                const names = ans?.facilitiesAmenitiesDetails
                                                    ?.map((i: { name: string }) => i.name)
                                                    .join(", ") || "";
                                                return names.length > 48 ? names.slice(0, 48) + "..." : names;
                                            })()}
                                        </p>

                                        <Link
                                            target="_blank"
                                            href={`/projects/${ans?.slug}`}
                                            className="font-medium underline text-sm text-red-600"
                                        >
                                            View Property Details
                                        </Link>

                                        <div className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-[#DEDEDE]"></div>
                                    </div>
                                </div>
                            ))
                        }

                        <div ref={bottomRef} />

                    </div>
                );
            })}
        </div>
    );
}
