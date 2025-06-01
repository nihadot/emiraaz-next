import { drop_up_red_icon } from "@/app/assets";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLessThan, FaGreaterThan, FaCaretDown } from "react-icons/fa";

const quarters = ["Q1", "Q2", "Q3", "Q4"];

interface YearSelectorProps {
  initialYear?: number;
  wrapperClassName?:string;
  initialQuarter?: string;
  onDone: (year: number | '', quarter: string | '') => void;
  onClose?: () => void;
  reset?: () => void;
  doneButton?:boolean;
  clearButton?:boolean;
  onChange?: (year: number, quarter: string) => void;
}

const YearSelector = ({
  initialYear,
  initialQuarter,
  clearButton = true,
  doneButton = true,
  onDone,
  onClose,
  reset,
  onChange,
  wrapperClassName,

}: YearSelectorProps) => {
  const [year, setYear] = useState(initialYear || new Date().getFullYear());
  const [selectedQuarter, setSelectedQuarter] = useState(initialQuarter || "");

  useEffect(() => {
    if (onChange) {
      onChange(year, selectedQuarter);
    }
  }, [year, selectedQuarter]);

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
    onClose?.();
  };

  return (
    <div className={clsx("flex items-center h-[203px] gap-2 pt-[8.25px] rounded-[3px] shadow-md bg-white outline-[#DEDEDE] flex-col w-[223px]",wrapperClassName)}>
      <p className="pb-2 font-poppins mt-1 md:mt-0 font-normal text-[12px]">Choose Year</p>
      <div className="flex gap-[18px] items-center justify-center">
        <FaCaretDown
          onClick={handlePrevYear}

          className='w-[20px] rotate-90 h-[20px]' color='#FF1645' />

        <p className="text-black font-poppins font-normal text-[20.25px]">{year}</p>


        <FaCaretDown
          onClick={handleNextYear}

          className='w-[20px] -rotate-90 h-[20px]' color='#FF1645' />

      </div>

      <p className="pb-2 font-poppins mt-1 md:mt-0 font-normal text-[12px]">Choose Quarter</p>

      <div className="grid sm:px-3 grid-cols-4 gap-[10.5px] w-full h-[42px] uppercase text-lg">
        {quarters.map((q) => (
          <div
            key={q}
            onClick={() => handleQuarterSelect(q)}
            className={`flex-1 w-full sm:w-[42px] h-[42px] text-[13.5px] border border-gray-300 rounded-[3px] flex justify-center font-normal font-poppins items-center cursor-pointer 
              ${selectedQuarter === q ? "bg-red-600/10 border-none text-red-600" : ""}`}
          >
            {q}
          </div>
        ))}
      </div>

      { (clearButton || doneButton) &&  <div className="flex w-full h-[29.25px] sm:px-3 gap-3">
       { clearButton &&  <button
          type="button"
          className="border w-full font-normal font-poppins text-[10.5px] rounded-[3px] text-[#FF1645] border-[#FF1645]"
          onClick={handleReset}
        >
          Reset
        </button>}
        { doneButton && <button
          className="border w-full font-normal font-poppins text-[10.5px] rounded-[3px] bg-[#FF1645] text-white border-[#FF1645]"
          onClick={handleDone}
        >
          Done
        </button>}
      </div>}
    </div>
  );
};

export default YearSelector;
