import clsx from "clsx";
import { useState } from "react";

interface BedBathSelectorProps {
  initialBeds?: number | 'Studio' | '6+' | '7+';
  initialBaths?: number | '6+';
  onDone: (beds: number | 'Studio' | '6+' | '7+' | '', baths: number | '6+' | '7+' | '') => void;
  onClose: () => void;
  reset?: () => void;
  doneButton?: boolean;
  clearButton?: boolean;
  wrapperClassName?: string;

  onChange?: (beds: number | 'Studio' | '6+' | '7+', baths: number | '6+' | '7+') => void;
}

const bedOptions: (number | 'Studio' | '6+' | '7+')[] = ['Studio', 1, 2, 3, 4, 5, 6, '7+'];
const bathOptions: (number | '6+')[] = [1, 2, 3, 4, 5, '6+'];

const BedBathSelector = ({
  initialBeds,
  initialBaths,
  onDone,
  onClose,
  reset,
  onChange,
  clearButton = true,
  doneButton = true,
  wrapperClassName,

}: BedBathSelectorProps) => {
  const [selectedBeds, setSelectedBeds] = useState<number | 'Studio' | '6+' | '7+' | ''>(initialBeds || '');
  const [selectedBaths, setSelectedBaths] = useState<number | '6+' | ''>(initialBaths || '');

  const handleBedSelect = (bed: number | 'Studio' | '6+' | '7+') => {
    setSelectedBeds(bed);
    if (onChange && selectedBaths !== '') {
      onChange(bed, selectedBaths as number | '6+' | '7+');
    }
  };

  const handleBathSelect = (bath: number | '6+') => {
    setSelectedBaths(bath);
    if (onChange && selectedBeds !== '') {
      onChange(selectedBeds as number | 'Studio' | '6+', bath);
    }
  };

  const handleReset = () => {
    setSelectedBeds('');
    setSelectedBaths('');
    onDone('', '');
    if (reset) reset();
  };

  const handleDone = () => {
    onDone(selectedBeds, selectedBaths);
    onClose();
  };

  return (
    <div className={clsx("flex rounded-[5px] border sm:p-[11.25px] bg-white border-gray-200 flex-col w-[223px]", wrapperClassName)}>
      <p className=" font-poppins font-medium sm:font-normal pb-[7px] text-[14px] sm:text-[12px] mt-3">No of Beds</p>

      <div className="w-full">
        {/* Beds Selection */}
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-[6px]">
            {bedOptions.map((bed) => (
              <button
                key={bed.toString()}
                onClick={() => handleBedSelect(bed)}
                className={`py-[9px] sm:py-[6px] text-[12px]  font-poppins font-normal px-[14px] sm:px-[10px] w-fit rounded-[5px] border border-gray-300 text-center
                  ${selectedBeds === bed ? 'bg-red-600/10 text-red-600   border-none' : 'text-gray-700'}`}
              >
                {bed}
              </button>
            ))}
          </div>
        </div>

        {/* Baths Selection */}
        <div className="flex flex-col">
          <p className=" font-poppins font-medium sm:font-normal pb-[7px] pt-[10px] text-[14px] sm:text-[12px] mt-2">No of Baths</p>
          <div className="flex flex-wrap gap-2">
            {bathOptions.map((bath) => (
              <button
                key={bath.toString()}
                onClick={() => handleBathSelect(bath)}
                className={`py-[9px] sm:py-[6px]  text-[12px] px-[14px] sm:px-[10px] rounded-[5px] border border-gray-300 w-fit font-poppins  font-normal text-center
                  ${selectedBaths === bath ? 'bg-red-600/10 text-red-600   border-none' : 'text-gray-700'}`}
              >
                {bath}
              </button>
            ))}
          </div>
        </div>
      </div>

      { (clearButton || doneButton) &&  <div className="flex w-full h-[29.25px] sm:px-3 gap-3">
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

export default BedBathSelector;