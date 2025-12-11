import React from 'react';

export interface TopBarProps {
    title?: React.ReactNode;
    backIcon?: React.ReactNode;
    optionsIcon?: React.ReactNode;
    onBack?: () => void;
    onOptions?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
    title,
    backIcon,
    optionsIcon,
    onBack,
    onOptions
}) => {
    return (
        <div className="flex items-center border-b border-gray-200 justify-between px-4 py-3">
            {onBack && backIcon && (
                <button onClick={onBack} className="p-1.5 -ml-2 border border-gray-200 rounded-full hover:bg-gray-100" aria-label="Go back">
                    {backIcon}
                </button>
            )}
            {title && (
                <h1 className="text-base font-poppins font-medium">{title}</h1>
            )}
            {onOptions && optionsIcon && (
                <button onClick={onOptions} className="p-2 -mr-2 rounded-full hover:bg-gray-100" aria-label="Options">
                    {optionsIcon}
                </button>
            )}
        </div>
    );
};
