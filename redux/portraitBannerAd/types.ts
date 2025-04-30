import { ImageType } from "@/utils/types";



export type FetchAllPortraitBannersResponse = {
    success: string,
    message: string,
    data: PortraitBanner[],
    pagination: PaginationType,
}


type PaginationType = {
    currentPage: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
}

export type PortraitBanner = {
    name: string;
    startingDate: string;
    endingDate: string;
    _id: string;
    slug: string;
    desktopImage?: ImageType,
    mobileImage?: ImageType,
}

