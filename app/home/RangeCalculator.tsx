import { errorToast } from "@/components/Toast";
import clsx from "clsx";
import { useState } from "react";

interface PriceRangeInputProps {
  initialMin?: number;
  initialMax?: number;
  onDone: (min: number | '', max: number | '') => void;
  onClose: () => void;
  reset?: () => void;
  doneButton?:boolean;
  clearButton?:boolean;
  onChange?: (min: number, max: number) => void;
  wrapperClassName?:string;
}

const PriceRangeInput = ({
  initialMin,
  initialMax,
  onDone,
  onClose,
  reset,
  onChange,
  wrapperClassName,
  clearButton = true,
  doneButton = true
}: PriceRangeInputProps) => {
  const [minValue, setMinValue] = useState<number | ''>(initialMin || '');
  const [maxValue, setMaxValue] = useState<number | ''>(initialMax || '');

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    const numValue = input ? parseInt(input, 10) : '';
    setMinValue(numValue);
    if (onChange && numValue !== '' && maxValue !== '') {
      onChange(numValue, maxValue);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    const numValue = input ? parseInt(input, 10) : '';
    setMaxValue(numValue);
    if (onChange && minValue !== '' && numValue !== '') {
      onChange(minValue, numValue);
    }
  };

  const handleReset = () => {
    setMinValue('');
    setMaxValue('');
    onDone('', '');
    if (reset) reset();
  };

  const handleDone = () => {
    // Validate that min is not greater than max
    if (minValue !== '' && maxValue !== '' && minValue > maxValue) {
      errorToast("Minimum price cannot be greater than maximum price");
      return;
    }
    onDone(minValue, maxValue);
    onClose();
  };

  const formatValue = (value: number | '') => {
    return value === '' ? '' : value.toLocaleString();
  };

  return (
    <div className={clsx("flex rounded-[5px] sm:p-[11px] border bg-white border-gray-200 flex-col w-[223px]",wrapperClassName)}>
      <p className="pb-2 font-poppins justify-start md:text-center font-medium sm:font-normal text-[14px] mt-3 sm:mt-0 sm:text-[12px]">Price(AED)</p>
      
      <div className="w-full flex gap-[4px]">
        <div className="flex flex-col   ">
          <label className="text-[10.5px]  text-gray-500 mb-1">Min</label>
          <div className="flex items-start justify-center gap-2">
            <input
              type="text"
              value={formatValue(minValue)}
              onChange={handleMinChange}
              className=" text-black text-[14px] sm:text-[12px] h-[40px] sm:h-[29px] text-center px-3 border-[#DEDEDE] rounded-[5px] flex-1 placeholder:text-[12px] text-xl w-full border flex justify-center items-center focus:outline-none"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex flex-col ">
          <label className="text-[10.5px] text-gray-500 mb-1">Max</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={formatValue(maxValue)}
              onChange={handleMaxChange}
              className="text-black text-[14px] sm:text-[12px] h-[40px] sm:h-[29px] text-center px-3 border-[#DEDEDE] rounded-[5px] placeholder:text-[12px] text-xl w-full border flex justify-center items-center focus:outline-none"
              placeholder="Any"
            />
          </div>
        </div>
      </div>

      { (clearButton || doneButton) &&  <div className="flex w-full mt-2 h-[29.25px] gap-[4px]">
       { clearButton &&  <button
          type="button"
          className="border w-full font-normal font-poppins text-[10.5px] rounded-[5px] text-[#FF1645] border-[#FF1645]"
          onClick={handleReset}
        >
          Reset
        </button>}
        { doneButton && <button
          className="border w-full font-normal font-poppins text-[10.5px] rounded-[5px] bg-[#FF1645] text-white border-[#FF1645]"
          onClick={handleDone}
        >
          Done
        </button>}
      </div>}
    </div>
  );
};

export default PriceRangeInput;