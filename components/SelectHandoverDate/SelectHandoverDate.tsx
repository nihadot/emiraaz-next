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
    <div className="flex items-center gap-2 py-4 rounded-[12px] border bg-white border-gray-200 flex-col w-[300px]">
      <p className="pb-2">Choose Year</p>
      <div className="flex pb-2 items-center gap-5 justify-center">
        <FaLessThan
          onClick={handlePrevYear}
          color="#FF1645"
          className="cursor-pointer"
        />
        <p className="text-black text-3xl">{year}</p>
        <FaGreaterThan
          onClick={handleNextYear}
          color="#FF1645"
          className="cursor-pointer"
        />
      </div>

      <p className="py-2">Choose Quarter</p>

      <div className="grid px-3 grid-cols-4 gap-3 w-full h-14 uppercase text-lg">
        {quarters.map((q) => (
          <div
            key={q}
            onClick={() => handleQuarterSelect(q)}
            className={`flex-1 border border-gray-300 rounded-[5px] flex justify-center items-center cursor-pointer 
              ${selectedQuarter === q ? "bg-[#FF1645] text-white border-[#FF1645]" : ""}`}
          >
            {q}
          </div>
        ))}
      </div>

      <div className="flex w-full h-10 px-3 gap-3">
        <button
          type="button"
          className="border w-full rounded-[5px] text-[#FF1645] border-[#FF1645]"
          onClick={handleReset}
        >
          Reset
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

export default YearSelector;
