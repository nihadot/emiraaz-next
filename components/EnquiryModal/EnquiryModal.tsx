"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TfiClose } from "react-icons/tfi";
import Title from "../ProjectDetails/New/ui/Title";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCountryCode } from "@/utils/useCountryCode";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; number: string }) => void;
    reset: boolean; // success state

}

export default function EnquiryModal({ open, onClose, onSubmit ,reset}: Props) {
  const countryCode = useCountryCode();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    number?: string;
  }>({});

 
  /* ---------------- VALIDATION ---------------- */

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.number || formData.number.length < 7) {
      newErrors.number = "Valid number number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- HANDLERS ---------------- */

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      name: formData.name,
      number: formData.number,
    });
  };

     useEffect(() => {
    if (reset) {
      setFormData({ name: "", number: "" });
      setErrors({});
    }
  }, [reset]);


  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              onClick={onClose}

          />

          {/* Modal */}
          <motion.div
            className="fixed px-[12px] h-fit mt-auto mb-2 inset-0 z-50 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
                onClick={(e) => e.stopPropagation()}

            className="relative w-full max-w-md bg-white rounded-2xl px-4 pt-4 pb-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <Title title="Submit Enquiry" />
                <button onClick={onClose} className="absolute top-4 right-4">
                  <TfiClose size={20} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-3">
                {/* Full Name */}
                <div>
                  <label className="text-sm font-poppins font-medium mb-2 block">
                    Full Name
                  </label>
                  <input
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="Enter your full name"
                    className={`w-full text-base h-12 px-4 rounded-lg border font-poppins outline-none ${
                      errors.name ? "border-red-500" : "border-[#DFDFDF]"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Number */}
                <div>
                  <label className="text-sm font-poppins font-medium mb-2 block">
                    Number no
                  </label>

                  <PhoneInput
                    country={"ae"}
                    value={formData.number || countryCode}
                    onChange={(value) => {
                      setFormData({ ...formData, number: value });
                      if (errors.number)
                        setErrors({ ...errors, number: undefined });
                    }}
                    inputProps={{ required: true }}
                    countryCodeEditable={false}
                    inputStyle={{
                      width: "100%",
                      height: "48px",
                      borderRadius: "8px",
                      fontSize:16,
                      borderColor: errors.number ? "#EF4444" : "#DFDFDF",
                    }}
                  />

                  {errors.number && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.number}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={handleSubmit}
                  className="w-full h-12 rounded-lg bg-black text-white font-poppins font-medium mt-2"
                >
                  Submit
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
