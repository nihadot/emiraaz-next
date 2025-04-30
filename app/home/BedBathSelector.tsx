import { useState } from "react";

interface BedBathSelectorProps {
  initialBeds?: number | 'Studio' | '6+' | '7+';
  initialBaths?: number | '6+' ;
  onDone: (beds: number | 'Studio' | '6+' | '7+' | '', baths: number | '6+' | '7+' | '') => void;
  onClose: () => void;
  reset?: () => void;
  onChange?: (beds: number | 'Studio' | '6+' | '7+', baths: number | '6+' | '7+') => void;
}

const bedOptions: (number | 'Studio' | '6+' | '7+')[] = ['Studio', 1, 2, 3, 4, 5, 6, '7+'];
const bathOptions: (number | '6+' )[] = [1, 2, 3, 4, 5,'6+'];

const BedBathSelector = ({
  initialBeds,
  initialBaths,
  onDone,
  onClose,
  reset,
  onChange,
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
      onChange(selectedBeds as number | 'Studio' | '6+' , bath);
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
    <div className="flex items-center gap-2 py-4 rounded-[12px] border bg-white border-gray-200 flex-col w-[300px]">
      <p className="pb-2">No. of Beds & Baths</p>
      
      <div className="w-full px-4 space-y-6">
        {/* Beds Selection */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-2">Beds</label>
          <div className="flex flex-wrap gap-2">
            {bedOptions.map((bed) => (
              <button
                key={bed.toString()}
                onClick={() => handleBedSelect(bed)}
                className={`py-[7px] px-[15px] w-fit rounded-[5px] border border-gray-300 text-center
                  ${selectedBeds === bed ? 'bg-[#FF1645] text-white border-[#FF1645]' : 'text-gray-700'}`}
              >
                {bed}
              </button>
            ))}
          </div>
        </div>

        {/* Baths Selection */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-2">Baths</label>
          <div className="flex flex-wrap gap-2">
            {bathOptions.map((bath) => (
              <button
                key={bath.toString()}
                onClick={() => handleBathSelect(bath)}
                className={`py-2 px-4 rounded-[5px] border border-gray-300 text-center
                  ${selectedBaths === bath ? 'bg-[#FF1645] text-white border-[#FF1645]' : 'text-gray-700'}`}
              >
                {bath}
              </button>
            ))}
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

export default BedBathSelector;