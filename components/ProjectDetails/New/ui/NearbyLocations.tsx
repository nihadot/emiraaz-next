"use client";

export default function NearbyLocations({
  items,
}: {
  items: string[];
}) {
  return (
    <div className="space-y-3">
      {items.map((text, i) => (
        <p key={i} className=" font-poppins text-sm font-normal text-black">
          {text}
        </p>
      ))}
    </div>
  );
}
