'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { LuMapPin } from 'react-icons/lu';
import { MdAccessTime } from 'react-icons/md';
import { FiChevronDown } from 'react-icons/fi';
import { formatDate } from '@/components/atom/button/formatDate';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  openHouseData: any;
  onSuccess: () => void;
}

export default function BookingFormModal({
  isOpen,
  onClose,
  openHouseData,
  onSuccess,
}: BookingFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNo: '',
    email: '',
    noOfSlots: '1',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full bg-white rounded-t-[22px] max-h-[92vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="p-4 border-b border-[#E5E7EB]">
          <div className="flex justify-between items-center">
            <h3 className="text-[18px] font-semibold text-black">
              Booking Form
            </h3>
            <button onClick={onClose}>
              <X size={22} />
            </button>
          </div>
          <p className="text-[13px] text-[#6B7280] mt-1">
            Fill in the details and confirm your slot
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {/* Property Card */}
          <div className="border border-[#E5E7EB] rounded-xl p-3 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-[12px] text-[#9CA3AF]">
                Damac
              </span>
              <span className="text-[12px] text-[#6B7280] flex items-center gap-1">
                31 Spots Left
              </span>
            </div>

            <h4 className="text-[15px] font-semibold text-black mb-3">
              {openHouseData?.title}
            </h4>

            <div className="flex items-center gap-2 text-[13px] text-[#6B7280] mb-2">
              <LuMapPin size={14} />
              {openHouseData?.location}
            </div>

            <div className="flex items-center gap-2 text-[13px] text-[#6B7280]">
              <MdAccessTime size={14} />
              {formatDate(openHouseData?.date)} @ {openHouseData?.time}
            </div>
          </div>

          {/* Inputs */}
          {[
            { label: 'Full Name', key: 'fullName', type: 'text', placeholder: 'Enter your full name' },
            { label: 'Email', key: 'email', type: 'email', placeholder: 'Enter your email id' },
          ].map((field) => (
            <div key={field.key} className="mb-4">
              <label className="block text-[13px] font-medium mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={(formData as any)[field.key]}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, [field.key]: e.target.value }))
                }
                className="w-full h-[44px] rounded-lg border border-[#E5E7EB] px-4 text-[14px]"
              />
            </div>
          ))}

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-[13px] font-medium mb-2">
              Phone no
            </label>
            <div className="flex gap-2">
              <div className="w-[70px] h-[44px] border border-[#E5E7EB] rounded-lg flex items-center justify-center gap-1">
                🇦🇪 <FiChevronDown size={14} />
              </div>
              <input
                className="flex-1 h-[44px] rounded-lg border border-[#E5E7EB] px-4 text-[14px]"
                placeholder="Enter Phone no"
              />
            </div>
          </div>

          {/* Slots */}
          <div className="mb-6">
            <label className="block text-[13px] font-medium mb-2">
              No of Slots
            </label>
            <div className="flex gap-2">
              {['1', '2', '3', '4', '5'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, noOfSlots: num }))}
                  className={`w-[40px] h-[40px] rounded-full border text-[14px]
                    ${
                      formData.noOfSlots === num
                        ? 'bg-black text-white border-black'
                        : 'border-[#E5E7EB] text-[#6B7280]'
                    }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={isSubmitting}
            className="w-full h-[48px] rounded-xl bg-black text-white text-[15px]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
