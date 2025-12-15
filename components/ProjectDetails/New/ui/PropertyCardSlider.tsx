"use client";
import { motion } from "framer-motion";
import { PropertyCard } from "./PropertyCard";
import { PropertyCardItem, usePropertyCards } from "../logic/usePropertyCards";
import { useFetchAllProjectsQuery } from "@/redux/project/projectApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function PropertyCardSlider() {


    const { data: projects } = useFetchAllProjectsQuery({
        limit: 12,
        page: 1,
    }, {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        skip: false,
    });

        const { projectId } = useSelector((state: RootState) => state.enquiry);

        console.log(projectId,'projectId')
    const formatedData: PropertyCardItem[] =
        projects?.data?.filter(i => i._id+'' !== projectId+'')?.map((item: any) => ({
            id: item._id,
            type: item?.type ?? "",
            totalFloors: item?.totalFloors ?? "",
            squareFeet: item?.squareFeet ?? "",
            image: item?.mainImages?.[0]?.webp?.url ?? "",
            propertyTypes: item?.propertyTypes?.join(", ") ?? "",
            title: item?.projectTitle ?? "",
            location: item?.address ?? "",
            beds: Number(item?.beds ?? 0),
            baths: Number(item?.baths ?? 0),
            area: String(item?.squareFeet ?? ""),
            price: String(item?.priceInAED ?? ""),
            slug: item?.slug ?? "",
        })) ?? [];



    const { cards, onCardClick } = usePropertyCards(formatedData);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 overflow-x-auto no-scrollbar"
        >
            {cards.map((item) => (
                <PropertyCard
                    key={item.id}
                    item={item}
                    onClick={onCardClick}
                />
            ))}
        </motion.div>
    );
}
