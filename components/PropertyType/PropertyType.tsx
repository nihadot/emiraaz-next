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
import { PiBuildingApartmentLight, PiBuildingApartmentThin, PiBuildingOfficeLight, PiBuildingOfficeThin, PiBuildings, PiBuildingsLight, PiWarehouseLight, PiWarehouseThin } from "react-icons/pi";
import { LiaBuildingSolid } from "react-icons/lia";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";

export default function PropertyType() {
    const logic = usePropertyType();

    const types = [
        { value:"apartment", label: "Apartment", icon: <PiBuildingOfficeThin size={32} /> },
        { value:"villa",label: "Villa", icon: <PiWarehouseThin size={32}/> },
        { value:"townhouse",label: "Townhouse", icon: <PiBuildingOfficeLight size={32} /> },
        { value:"penthouse",label: "Penthouse", icon: <PiBuildingApartmentThin size={32} /> },
        { value:"shops",label: "Shops", icon: <PiWarehouseLight size={32} /> },
        { value:"warehouse",label: "Warehouse", icon: <PiBuildingApartmentLight size={32} /> },
        { value:"officespace",label: "Office Space", icon: <LiaBuildingSolid size={32} /> },
    ];

    return <PropertyTypeUI types={types} {...logic} />;
}
