import { ImageType } from "@/utils/types";

  export interface ItemOpenHouse {
    title: string;
    date: string;
    time: string;
    location: string;
    developerId: string;
    image: ImageType
    _id: string;
}