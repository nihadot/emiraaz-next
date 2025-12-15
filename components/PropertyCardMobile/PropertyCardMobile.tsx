"use client";

import { usePropertyCard, PropertyCardData } from "./logic/usePropertyCard";
import PropertyCardUI from "./ui/PropertyCardUI";

export default function PropertyCardMobile({ data }: { data: PropertyCardData }) {
  const card = usePropertyCard(data);
  return <PropertyCardUI {...card} />;
}
