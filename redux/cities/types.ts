import { ImageType } from "@/utils/types"
import { ProjectType } from "../types"
import { AllProjectsItems } from "../project/types"

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
    slug?: string;
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
    data: CityItemWithCount[]
    pagination: PaginationType,
}


export type FetchAllCitiesUnderProjectResponse = {
    success: string,
    message: string,
    data: AllProjectsItems[]
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


export type CityItemWithCount = {
  _id: string;
  name?: string;
  slug: string;
  image: ImageType;
  projectTypeCounts: ProjectTypeCounts;
};


export type ProjectTypeCounts = {
  [key in RawProjectType]?: number;
};

export type RawProjectType =
  | 'Commercial-residential'
  | 'Project-commercial'
  | 'Project-residential'
  | 'Resale-commercial'
  | 'Resale-residential'
  | 'Secondary-residential'
  | 'Land-commercial'
  | 'Land-residential'
  | 'Secondary-commercial';
