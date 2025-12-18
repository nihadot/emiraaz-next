"use client";


import {
    apartment,
    villa,
    townhouse,
    penthouse
} from "@/app/assets"; // your icons
import { usePropertyType } from "./logic/usePropertyType";
import PropertyTypeUI from "./ui/PropertyTypeUI";
import { Building, Hotel, HousePlus, Pentagon, Store } from "lucide-react";
import { PiBuildingApartmentLight, PiBuildingApartmentThin, PiBuildingOfficeLight, PiBuildingOfficeThin, PiBuildings, PiBuildingsDuotone, PiBuildingsLight, PiBuildingsThin, PiWarehouseLight, PiWarehouseThin } from "react-icons/pi";
import { LiaBuildingSolid } from "react-icons/lia";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { BsBuildings } from "react-icons/bs";

export default function PropertyType() {
    const logic = usePropertyType();

    const types = [
        { value:"apartment", label: "Apartment", icon: <PiBuildingOfficeLight size={30} /> },
        { value:"villa",label: "Villa", icon: <PiBuildingsLight size={30}/> },
        { value:"townhouse",label: "Townhouse", icon: <PiBuildingOfficeLight size={30} /> },
        { value:"penthouse",label: "Penthouse", icon: <PiBuildingApartmentLight size={30} /> },
        { value:"shops",label: "Shops", icon: <PiWarehouseLight size={30} /> },
        { value:"warehouse",label: "Warehouse", icon: <PiBuildingApartmentLight size={30} /> },
        { value:"officespace",label: "Office Space", icon: <LiaBuildingSolid size={30} /> },
    ];

    return <PropertyTypeUI types={types} {...logic} />;
}
