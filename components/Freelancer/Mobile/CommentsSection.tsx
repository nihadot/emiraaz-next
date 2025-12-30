"use client";

import { useState } from "react";
import CommentArrowIcon from "../../../public/Freelancer/mobile/CommentArrow.svg";
import CommentCloseIcon from "../../../public/Freelancer/mobile/CommentClose.svg";
import MenIcon from "../../../public/Freelancer/mobile/MenIcon.svg";
import ShareIcon from "../../../public/Freelancer/mobile/ShareIcon.svg";
import InfoIcon from "../../../public/Freelancer/mobile/InfoIcon.svg";
import HeartIcon from "../../../public/Freelancer/mobile/HeartIcon.svg";
import Image from "next/image";

type Comment = {
  id: number;
  name: string;
  time: string;
  text: string;
  likes: number;
};

const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    name: "Jhon Doe",
    time: "5 min ago",
    text: "I've been working as a freelancer for a while now, and this platform makes things so much smoother. I can finally manage clients and projects without stress.",
    likes: 13,
  },
  {
    id: 2,
    name: "Jhon Doe",
    time: "5 min ago",
    text: "I've been working as a freelancer for a while now, and this platform makes things so much smoother. I can finally manage clients and projects without stress.",
    likes: 13,
  },
  {
    id: 3,
    name: "Jhon Doe",
    time: "5 min ago",
    text: "I've been working as a freelancer for a while now, and this platform makes things so much smoother. I can finally manage clients and projects without stress.",
    likes: 13,
  },
];

export default function CommentsSection() {
  const [comment, setComment] = useState("");

  return (
    <section className="mt-8 px-6">
      {/* Title */}
      <h3 className="text-lg font-semibold mb-4 text-gray-900 text-center">
        Comments ({MOCK_COMMENTS.length})
      </h3>

      {/* Input Box */}
      <div className="relative mb-6">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment"
          className="
            w-full h-[141px]
            rounded-[10px] border border-[#DEDEDE]
            p-4 text-sm text-gray-600
            placeholder:text-gray-400
            outline-none resize-none
            focus:border-gray-300
          "
        />

        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          {/* Clear Button */}
          {comment && (
            <button
              onClick={() => setComment("")}
              className="h-9 w-9 rounded-[7px] bg-[#F5F5F5] hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <Image
                src={CommentCloseIcon}
                alt="CommentCloseIcon"
                className="w-[19px] h-[19px]"
              />
            </button>
          )}

          {/* Send Button */}
          <button className="h-9 w-9 rounded-[7px] bg-[#FF1645] hover:bg-red-700 flex items-center justify-center transition-colors">
            <Image
              src={CommentArrowIcon}
              alt="CommentIcon"
              className="w-[19px] h-[19px]"
            />
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {MOCK_COMMENTS.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-gray-200 p-5 bg-white"
          >
            {/* User Info */}
            <div className="flex items-start gap-3 mb-3">
              <div className="h-10 w-10 rounded-full  bg-[#DEDEDE]  flex items-center justify-center shrink-0">
                <Image
                  src={MenIcon}
                  alt="usersIcon"
                  className="w-[25px] h-[25px]"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
              </div>
            </div>

            {/* Comment Text */}
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {item.text}
            </p>
            <hr className="text-[#DEDEDE] relative bottom-3" />
            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Image
                  src={HeartIcon}
                  alt="InfoIcon"
                  className="w-[18px] h-[18px]"
                />
                <span className="text-[11px] text-gray-600">{item.likes}</span>
              </div>

              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-gray-600">
                  <Image src={InfoIcon} alt="InfoIcon" className="w-5 h-5" />
                </button>
                <button className="text-gray-400  hover:text-gray-600">
                  <Image
                    src={ShareIcon}
                    alt="ShareIcon"
                    className="w-[17px] h-[17px]"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
