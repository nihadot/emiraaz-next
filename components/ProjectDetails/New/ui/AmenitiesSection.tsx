import { Building2 } from "lucide-react";
import { Amenity, useAmenities } from "../logic/useAmenities";
import AmenitiesUI from "./AmenitiesUI";


export default function AmenitiesSection({data,handleViewAll}: {data: Amenity[],handleViewAll:()=>void}) {
  const { amenities } = useAmenities(data);

  return <AmenitiesUI amenities={amenities} onViewAll={handleViewAll} />;
}      
