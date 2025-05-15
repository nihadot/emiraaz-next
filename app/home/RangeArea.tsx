import { useState } from "react";

interface AreaRangeInputProps {
  initialMin?: number;
  initialMax?: number;
  unit?: 'sqft' | 'sqm';
  onDone: (min: number | '', max: number | '') => void;
  onClose: () => void;
  reset?: () => void;
  onChange?: (min: number, max: number) => void;
}

const AreaRangeInput = ({
  initialMin,
  initialMax,
  unit = 'sqft',
  onDone,
  onClose,
  reset,
  onChange,
}: AreaRangeInputProps) => {
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
      alert(`Minimum area cannot be greater than maximum area`);
      return;
    }
    onDone(minValue, maxValue);
    onClose();
  };

  const formatValue = (value: number | '') => {
    return value === '' ? '' : value.toLocaleString();
  };

  return (
    <div className="flex items-center rounded-[5px] p-[11px] border bg-white border-gray-200 flex-col w-[223px]">
      <p className="pb-2 font-poppins font-normal text-[12px] text-start">Area({unit})</p>

      <div className="w-full flex gap-[4px]">
        <div className="flex flex-col   ">
          <label className="text-[10.5px]  text-gray-500 mb-1">Min</label>
          <div className="flex items-start justify-center gap-2">
            <input
              type="text"
              value={formatValue(minValue)}
              onChange={handleMinChange}
              className=" text-black text-[12px] h-[29px] text-center px-3 border-[#DEDEDE] rounded-[5px] flex-1 placeholder:text-[12px] text-xl w-full border flex justify-center items-center focus:outline-none"
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
              className="text-black h-[29px] text-[12px] text-center px-3 border-[#DEDEDE] rounded-[5px] placeholder:text-[12px] text-xl w-full border flex justify-center items-center focus:outline-none"
              placeholder="Any"
            />
          </div>
        </div>
      </div>

      <div className="flex mt-[7.5px] w-full h-[29.25px] gap-[4px]">
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

export default AreaRangeInput;