"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import UEA from "../../../public/flags/united-arab-emirates-flag-circular-17754.svg";
import INDIA from "../../../public/flags/india-flag-circular-17791.svg";
import USA from "../../../public/flags/usa-flag-circular-17882.svg";
import UK from "../../../public/flags/uk-flag-circular-17883.svg";
import AUSTRALIA from "../../../public/flags/australia-flag-circular-17749.svg";
import { useState } from "react";
import { StaticImageData } from "next/image";

//types are here

type Country = {
  code: string;
  name: string;
  flag: StaticImageData;
};

function MobileEditProfile() {
  const router = useRouter();

  //sample country calling code dropdown data

  const countries: Country[] = [
    {
      code: "+971",
      name: "UAE",
      flag: UEA,
    },
    {
      code: "+91",
      name: "India",
      flag: INDIA,
    },
    {
      code: "+1",
      name: "USA",
      flag: USA,
    },
    {
      code: "+44",
      name: "UK",
      flag: UK,
    },
    {
      code: "+61",
      name: "Australia",
      flag: AUSTRALIA,
    },
  ];
  const [selectedCountry, setSeletedCountry] = useState<Country>(countries[0]);
  const [open, setOpen] = useState<Boolean>(false);
  return (
    <main className="min-h-screen bg-white font-poppins px-4 pb-28 mt-20">
      {/* Form */}
      <form className="space-y-5 mt-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1 ">
            Full Name
          </label>
          <input
            type="text"
            defaultValue="Jhon Doe"
            className="w-full h-12 rounded-lg border  text-gray-600 border-gray-200 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1">
            Email
          </label>
          <input
            type="email"
            defaultValue="jhondoe@gmail.com"
            className="w-full h-12 rounded-lg border text-gray-600 border-gray-200 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Phone */}
        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1">
            Phone no
          </label>

          <div className="relative">
            {/* Input wrapper */}
            <div className="flex items-center h-12 rounded-lg border border-gray-200 px-3 bg-white">
              {/* Country selector (left) */}
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 pr-3 mr-3"
              >
                <Image
                  src={selectedCountry.flag}
                  alt={selectedCountry.name}
                  width={20}
                  height={14}
                />
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Code + number */}
              <span className="text-sm text-gray-600 mr-1">
                {selectedCountry.code}
              </span>

              <input
                type="tel"
                placeholder="12345 90856"
                className="flex-1 h-full text-sm text-gray-600 focus:outline-none"
              />
            </div>

            {/* Dropdown */}
            {open && (
              <div className="absolute z-10 mt-2 w-full max-w-[260px] bg-white border border-gray-200 rounded-lg shadow-md">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      setSeletedCountry(country);
                      setOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    <Image
                      src={country.flag}
                      alt={country.name}
                      width={20}
                      height={14}
                    />
                    <span className="flex-1 text-left">{country.name}</span>
                    <span className="text-gray-500">{country.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 flex gap-3 border-inherit shadow-[0_-4px_10px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 h-11 rounded-lg border border-gray-200 text-sm font-semibold"
        >
          Discard
        </button>

        <button
          type="button"
          className="flex-1 h-11 rounded-lg bg-black text-white text-sm font-semibold"
        >
          Save
        </button>
      </div>
    </main>
  );
}

export default MobileEditProfile;
