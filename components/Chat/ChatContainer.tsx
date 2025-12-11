import { ChatBubble } from "./ChatBubble";
import { QuickActionButton } from "./QuickActionButton";

interface Action {
    label: string;
    onClick: () => void;
}

interface ChatContainerProps {
    minminize?: boolean;
    message: string;
    actions: Action[];
}

export const ChatContainer = ({ message, actions,minminize }: ChatContainerProps) => (
    <div className="w-full flex  md:block hidden flex-col gap-4">
        <ChatBubble 
        minminize={minminize}
        text={message} />
        {actions.length > 0 && (
            <div className="flex w-full overflow-auto justify-start py-2 gap-2">
                {actions.map((action, index) => (
                    <QuickActionButton
                        key={index}
                        minminize={minminize}
                        label={action.label}
                        onClick={action.onClick}
                    />
                ))}
            </div>
        )}
    </div>
)
