import Image from "next/image";

interface MobileFeatureCardProps {
    title: string;
    desc: string;
    icon: string;
}

export function MobileFeatureCard({ title, desc, icon }: MobileFeatureCardProps) {
    return (
        <div className="bg-white border border-[#DEDEDE] rounded-xl p-3 flex flex-col gap-1 h-full">
            <div className="flex justify-between items-start">
                <h3 className="font-medium text-[13px] leading-tight text-black font-poppins">{title}</h3>
                <div className="mt-0.5">
                    <Image
                        src={icon}
                        alt={title}
                        width={18}
                        height={18}
                    />
                </div>
            </div>
            <p className="text-sm leading-[24px] text-gray-500 leading-relaxed">
                {desc}
            </p>
        </div>
    );
}
