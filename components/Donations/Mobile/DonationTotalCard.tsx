export default function DonationTotalCard({
  amount,
}: {
  amount: string;
}) {
  return (
    <div className="mt-6 rounded-2xl bg-black p-5 flex items-center justify-between overflow-hidden relative">
      {/* Left */}
      <div>
        <p className="text-xs text-white/80 mb-1">
          Total Donations Till Date
        </p>
        <p className="text-xl font-semibold text-white">
          AED {amount}
        </p>
      </div>

      {/* Decorative circles */}
      <div className="absolute right-0 top-0 h-full flex">
        <div className="w-16 bg-white/10 rounded-l-full" />
        <div className="w-16 bg-white/20 rounded-l-full" />
      </div>
    </div>
  );
}
