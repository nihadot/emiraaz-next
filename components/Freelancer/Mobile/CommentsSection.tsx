'use client';

import { useState } from 'react';
import { Send, X, Heart, Info, Share2, User } from 'lucide-react';

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
    name: 'Jhon Doe',
    time: '5 min ago',
    text:
      "I've been working as a freelancer for a while now, and this platform makes things so much smoother. I can finally manage clients and projects without stress.",
    likes: 13,
  },
  {
    id: 2,
    name: 'Jhon Doe',
    time: '5 min ago',
    text:
      "I've been working as a freelancer for a while now, and this platform makes things so much smoother. I can finally manage clients and projects without stress.",
    likes: 13,
  },
  {
    id: 3,
    name: 'Jhon Doe',
    time: '5 min ago',
    text:
      "I've been working as a freelancer for a while now, and this platform makes things so much smoother. I can finally manage clients and projects without stress.",
    likes: 13,
  },
];

export default function CommentsSection() {
  const [comment, setComment] = useState('');

  return (
    <section className="mt-8 px-6">
      {/* Title */}
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        Comments ({MOCK_COMMENTS.length})
      </h3>

      {/* Input Box */}
      <div className="relative mb-6">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment"
          className="
            w-full h-[140px]
            rounded-2xl border border-gray-200
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
              onClick={() => setComment('')}
              className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-gray-600" />
            </button>
          )}

          {/* Send Button */}
          <button
            className="h-9 w-9 rounded-lg bg-pink-600 hover:bg-pink-700 flex items-center justify-center transition-colors"
          >
            <Send size={16} className="text-white" fill="white" />
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
              <div className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {item.time}
                </p>
              </div>
            </div>

            {/* Comment Text */}
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {item.text}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Heart size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">{item.likes}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-gray-600">
                  <Info size={18} />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}