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
    <div className="flex items-center gap-2 py-4 rounded-[12px] border bg-white border-gray-200 flex-col w-[300px]">
      <p className="pb-2">Select Area Range ({unit})</p>
      
      <div className="w-full px-4 space-y-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">Minimum Area</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={formatValue(minValue)}
              onChange={handleMinChange}
              className="text-black placeholder:text-sm text-xl w-full border-b border-gray-300 focus:outline-none focus:border-[#FF1645]"
              placeholder="0"
            />
            <span className="text-gray-500 text-sm">{unit}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">Maximum Area</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={formatValue(maxValue)}
              onChange={handleMaxChange}
              className="text-black placeholder:text-sm text-xl w-full border-b border-gray-300 focus:outline-none focus:border-[#FF1645]"
              placeholder="Any"
            />
            <span className="text-gray-500 text-sm">{unit}</span>
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

export default AreaRangeInput;