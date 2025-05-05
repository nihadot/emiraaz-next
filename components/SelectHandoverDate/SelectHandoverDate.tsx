import { drop_up_red_icon } from "@/app/assets";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";

const quarters = ["Q1", "Q2", "Q3", "Q4"];

interface YearSelectorProps {
  initialYear?: number;
  initialQuarter?: string;
  onDone: (year: number | '', quarter: string | '') => void;
  onClose: () => void;
  reset?: () => void;
  onChange?: (year: number, quarter: string) => void;
}

const YearSelector = ({
  initialYear,
  initialQuarter,
  onDone,
  onClose,
  reset,
  onChange,
}: YearSelectorProps) => {
  const [year, setYear] = useState(initialYear || new Date().getFullYear());
  const [selectedQuarter, setSelectedQuarter] = useState(initialQuarter || "");

  useEffect(() => {
    if (onChange) {
      onChange(year, selectedQuarter);
    }
  }, [year, selectedQuarter,onChange]);

  const handlePrevYear = () => {
    if (year > 1900) {
      setYear(prev => prev - 1);
    }
  };

  const handleNextYear = () => {
    if (year < 2100) {
      setYear(prev => prev + 1);
    }
  };

  const handleQuarterSelect = (quarter: string) => {
    setSelectedQuarter(quarter);
  };

  const handleReset = () => {
    setSelectedQuarter("");
    onDone('', '');
    if (reset) reset();
  };

  const handleDone = () => {
    onDone(year, selectedQuarter);
    onClose();
  };

  return (
    <div className="flex items-center h-[200px] gap-2 pt-[8.25px] rounded-[3px] border bg-white border-gray-200 flex-col w-[222.5px]">
      <p className="pb-2 font-poppins font-normal text-[12px]">Choose Year</p>
      <div className="flex gap-[18px] items-center justify-center">
      <Image
      onClick={handlePrevYear}
              src={ drop_up_red_icon}
              alt='dropdown icon'
              width={15} height={15} className={clsx('object-cover -rotate-90')}
            />
        <p className="text-black font-poppins font-normal text-[20.25px]">{year}</p>
 
         <Image
      onClick={handleNextYear}
              src={ drop_up_red_icon}
              alt='dropdown icon'
              width={15} height={15} className={clsx('object-cover rotate-90')}
            />
      </div>

      <p className="pb-2 font-poppins font-normal text-[12px]">Choose Quarter</p>

      <div className="grid px-3 grid-cols-4 gap-3 w-full h-[42px] uppercase text-lg">
        {quarters.map((q) => (
          <div
            key={q}
            onClick={() => handleQuarterSelect(q)}
            className={`flex-1 text-[13.5px] border border-gray-300 rounded-[5px] flex justify-center font-medium font-poppins items-center cursor-pointer 
              ${selectedQuarter === q ? "bg-red-600/10 border-none text-red-600" : ""}`}
          >
            {q}
          </div>
        ))}
      </div>

      <div className="flex w-full h-[29.25px] px-3 gap-3">
        <button
          type="button"
          className="border w-full font-normal font-poppins text-[10.5px] rounded-[5px] text-[#FF1645] border-[#FF1645]"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="border w-full font-normal font-poppins text-[10.5px] rounded-[5px] bg-[#FF1645] text-white border-[#FF1645]"
          onClick={handleDone}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default YearSelector;
