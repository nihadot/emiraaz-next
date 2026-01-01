const tabs = ['For You', 'Business', 'Sports', 'Politics'];

export default function Tabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className=" border-gray-200">
      <div className="flex gap-10 px-3 pt-2">
        {tabs.map((tab) => {
          const isActive = active === tab;

          return (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              className={`
                relative pb-2
                text-[16px]
                transition-colors
                ${
                  isActive
                    ? 'text-black font-semibold'
                    : 'text-gray-500 font-normal'
                }
              `}
            >
              {tab}

              {isActive && (
                <span
                  className="
                    absolute -bottom-[1px] left-1/2
                    h-[2px] w-8
                    -translate-x-1/2
                    bg-black
                    rounded-full
                  "
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
