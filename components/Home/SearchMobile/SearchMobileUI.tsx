import Image from "next/image";

function SearchMobileUI({ value, onChange, onFilterClick, searchIcon, filterIcon }: any) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-full px-4 py-3 border border-gray-100">
          <Image src={searchIcon} alt="" width={20} height={20} />
          <input
            type="text"
            placeholder="Search.."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>
        <button
          onClick={onFilterClick}
          className="bg-red-500 p-3 rounded-xl shadow-md hover:bg-red-600 transition-colors"
        >
          <Image src={filterIcon} alt="" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}

export default SearchMobileUI;
