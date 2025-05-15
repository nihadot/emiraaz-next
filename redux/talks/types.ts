import { Pagination } from "@/utils/types";
import { ImageItem } from "../types";


export type FetchAllVideoResponse = {
    success:boolean,
    message:string,
    data:VideoItem[],
    pagination:Pagination,
}



export type FetchVideoByIdPayload = {
    id:string,
}



export type VideoItem = {
    _id: string,
    slug: string,
    videoTitle: string;
    videoUrl?: string;
    thumbnail?: ImageItem;
}


export type FetchVideoByIdResponse = {
    success:boolean,
    message:string,
}
