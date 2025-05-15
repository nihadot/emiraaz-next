import clsx from "clsx";
import React from "react";

type SpaceWrapperProps = {
    children: React.ReactNode;
    className: string; // Tailwind spacing like "mb-6", "py-4", etc.
};

const SpaceWrapper: React.FC<SpaceWrapperProps> = ({
    children,
    className = "mb-6"
}) => {
    return <div className={clsx('', className)}>{children}</div>;
};

export default SpaceWrapper;
