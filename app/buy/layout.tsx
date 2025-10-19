import LayoutForBuy from "@/components/LayoutForBuy/LayoutForBuy";
import { ReactNode } from "react";

export default function CatchAllLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutForBuy
    >
      {children}
    </LayoutForBuy>
  );
}
