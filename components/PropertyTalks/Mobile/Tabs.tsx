const tabs = ['For You', 'Business', 'Sports', 'Politics'];

export default function Tabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex gap-8 px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`pb-3 text-[15px] font-normal relative transition-colors ${
              active === tab
                ? 'text-black font-medium'
                : 'text-gray-400'
            }`}
          >
            {tab}
            {active === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}