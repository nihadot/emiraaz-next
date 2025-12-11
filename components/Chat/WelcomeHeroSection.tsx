import clsx from "clsx";
import { SuggestionQuestion } from "@/components/Chat/SuggestionQuestion";

interface WelcomeHeroSectionProps {
    small?: boolean;
}

export function WelcomeHeroSection({ small }: WelcomeHeroSectionProps) {
    return (
        <div className="flex flex-col">
            <div className={clsx("flex-1", small ? "py-[20px]" : "py-[40px] lg:py-[80px]")}>
                <h1 className={clsx(
                    "text-start md:text-center font-medium font-poppins",
                    small ? "text-[20px] leading-[30px]" : "text-[28px] md:text-[38px] leading-[42px] lg:leading-[60px]"
                )}>
                    Meet Your New <span style={{ color: "#FF1645" }}>Property Agent</span>
                </h1>
                <p className={clsx(
                    "text-[#333333] mt-2 md:mt-0 text-start md:text-center",
                    small ? "text-[12px]" : "text-sm"
                )}>
                    No more filters. No more forms. Just chat and discover. Powered by{" "}
                    <span style={{ color: "#FF1645" }}>AI</span>
                </p>
            </div>

            {/* Questions */}
            <div className="flex flex-col gap-3 mb-3">
                <div className={clsx(
                    "text-[#666666] bg-white w-fit z-20 border-[#DEDEDE] rounded-md border font-poppins font-normal",
                    small ? "text-[10px] py-2 px-3" : "text-sm py-3 px-5"
                )}>
                    Hi am your ai assistant to find answers to your questions and get answers
                </div>

                {!small && (
                    <div className="flex sm:flex-row flex-col gap-3">
                        <SuggestionQuestion title="I want to buy a villa in Palm Jumeirah" />
                        <SuggestionQuestion title="Show me off-plan projects in Dubai Marina" />
                        <SuggestionQuestion title="What are the best investment options?" />
                    </div>
                )}
            </div>
        </div>
    );
}
