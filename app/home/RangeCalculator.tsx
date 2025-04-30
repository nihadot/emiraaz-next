import { errorToast } from "@/components/Toast";
import { useState } from "react";

interface PriceRangeInputProps {
  initialMin?: number;
  initialMax?: number;
  onDone: (min: number | '', max: number | '') => void;
  onClose: () => void;
  reset?: () => void;
  onChange?: (min: number, max: number) => void;
}

const PriceRangeInput = ({
  initialMin,
  initialMax,
  onDone,
  onClose,
  reset,
  onChange,
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
    <div className="flex items-center gap-2 py-4 rounded-[12px] border bg-white border-gray-200 flex-col w-[300px]">
      <p className="pb-2">Enter Price Range</p>
      
      <div className="w-full px-4 space-y-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">Minimum Price</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={formatValue(minValue)}
              onChange={handleMinChange}
              className="text-black placeholder:text-sm text-xl w-full border-b border-gray-300 focus:outline-none focus:border-[#FF1645]"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">Maximum Price</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={formatValue(maxValue)}
              onChange={handleMaxChange}
              className="text-black placeholder:text-sm text-xl w-full border-b border-gray-300 focus:outline-none focus:border-[#FF1645]"
              placeholder="Any"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full h-10 px-3 gap-3 mt-4">
        <button
          type="button"
          className="border w-full rounded-[5px] text-[#FF1645] border-[#FF1645]"
          onClick={handleReset}
        >
          Clear
        </button>
        <button
          className="border w-full rounded-[5px] bg-[#FF1645] text-white border-[#FF1645]"
          onClick={handleDone}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default PriceRangeInput;