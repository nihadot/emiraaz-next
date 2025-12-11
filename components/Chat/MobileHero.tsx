"use client";
import { highlightsAiAgent, price, recommendationsAiAgent, searchAiAgent } from "@/app/assets";
import { ChatContainer } from "./ChatContainer";
import { MobileFeatureCard } from "@/components/Chat/MobileFeatureCard";
import clsx from "clsx";

export function MobileHero({minminize}: {minminize?: boolean}) {
    return (
        <div className={clsx("flex flex-col  pb-0",
            // {
            // "items-center" : !minminize
            minminize ? "items-start pt-0" : "items-center pt-5"
        // }
        )}>
            {/* Glowing Orb */}
            <div className="relative md:hidden w-52 h-52 mb-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#FF1645] rounded-full blur-[40px] opacity-20 animate-pulse"></div>
                <div className="relative w-38 h-38 rounded-full bg-gradient-to-br from-[#FF5F80] via-[#FF1645] to-[#D9002E] shadow-xl flex items-center justify-center overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-50"></div>
                </div>
            </div>

            {/* Greeting */}
            <h1 className="text-2xl md:hidden font-medium text-center leading-[26px] font-poppins text-black mb-2 px-4 leading-tight">
                Hi Jhon Doe How Can I Help You Today
            </h1>

            <div className={(clsx({
                "py-2 md:py-10" : !minminize
            }))}>
                <h1 className={clsx(" md:block hidden font-medium leading-[26px] font-poppins text-black   leading-tight",{
                    'text-start px-0 text-2xl mb-2' : minminize,
                    'px-0 text-3xl mb-3' : !minminize
                })}>
                    Meet Your New <span className="text-[#FF1645]">Property Agent</span>
                </h1>

                <p className={clsx("text-gray-500 text-xs   font-poppins",{
                    'text-start px-0 mb-2' : minminize, 
                    'text-center px-8 mb-4' : !minminize
                })}>
                    No more filters. No more forms. Just chat and discover. Powered by <span className="text-[#FF1645]">AI</span>
                </p>
            </div>

            <ChatContainer
            minminize={minminize}
                message="Hi im your ai assistant to find you the property you are looking for in UAE. How may i help you"
                actions={[
                    {
                        label: "Show me the best apartments in UAE under 2M AED",
                        onClick: () => { }
                    },
                    {
                        label: "Show me the best apartments in UAE under 2M AED",
                        onClick: () => { }
                    },
                    {
                        label: "Show me the best apartments in UAE under 2M AED",
                        onClick: () => { }
                    },
                ]}
            />

            {/* Cards Grid */}
            <div className="grid grid-cols-2 md:hidden block gap-3 w-full">
                <MobileFeatureCard
                    title="Smart Property Search"
                    desc="Helps you discover the right properties based on your needs."
                    icon={searchAiAgent}
                />
                <MobileFeatureCard
                    title="Price & Area Insights"
                    desc="Gives you accurate price trends and location insights instantly."
                    icon={price}
                />
                <MobileFeatureCard
                    title="Recommendations"
                    desc="Shows trusted developers with projects that match your goals."
                    icon={recommendationsAiAgent}
                />
                <MobileFeatureCard
                    title="Project Highlights"
                    desc="Shows key features, amenities, and benefits of each property."
                    icon={highlightsAiAgent}
                />
            </div>
        </div>
    );
}
