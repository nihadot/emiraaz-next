import { ImageType } from "@/utils/types";

export type AllSmallVideoItems = {
    name: string;
    startingDate: string;
    endingDate: string;
    videoFile ?: ImageType,
    thumbnail?: ImageType,
    slug: string;
    _id:string;
    projectDetails: {
       
        slug: string;
        
    }
}
    