import { ImageType } from "@/utils/types"

export type FetchAllCityNamesResponse = {
    success: string,
    message: string,
    data: CityNames[]
}

export type FetchAllCityAndCountResponse = {
    success: string,
    data: CityWithCount[]
}


type CityNames = {
    _id: string;
    name: string;
    count: number;
}

type CityWithCount = {
    projectTypes: {
        projectType: string,
        count: number
    }[];
    city: string;
    totalProjects: number;

}



export type FetchAllCitiesResponse = {
    success: string,
    message: string,
    data: CityItem[],
    pagination: PaginationType,
}


type PaginationType = {
    currentPage: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
}


export type FetchCityByIdResponse = {
    success: string,
    data: CityItem,
}

export type FetchCityByIdPayload = {
    id: string,
}



export type CityItem = {
    name: string | undefined;
    slug: string;
    _id: string;
    image:ImageType;
}