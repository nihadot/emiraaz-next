import { ImageType } from "@/utils/types";
import { ProjectType } from "../types";

export type AllWishlistItems = {
  projectTitle: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  priceInAED: string;
  propertyTypes: string[]
  numberOfBath: string;
  squareFeet: string; completionType: string;
  discount: string;
  uniqueId: string;
  projectType: ProjectType;
  numberOfBeds: string;
  averageRent?: string, type: string;
  purpose: string;
  reference: string; furnishing: string;
  handoverDate: string;
  handOverYear:string;
  handOverQuarter:string;
  projectName: string;
  projectStatus: string;
  lastInspected: string;

  buildingName: string;
  totalFloors: string;
  retailCenters: string;
  totalParkingSpaces: string;
  totalBuildingArea: string;
  officers: string;
  elevators: string;
  swimmingPool: string;
  yearOfCompletion?: string;
  ownerShip: string;
  buildUpArea: string;
  usage: string;
  parkingAvailability: string;

  permitNumber: string;
  DED: string;
  ORN: string;
  BRN: string;
  googleMapsUrl: string;
  address: string;
  description: string;
  descriptionInArabic: string;
  descriptionInRussian: string;
  priority: string;
  paymentOptions: string[];
  nearByAreas: string[];
  youtubeVideoLink: string;
  selectedAds: string;
  projectNumber: string;
  qrCodeImage: ImageType;
  paymentPlan?: string;
  layoutImages: ImageType[];
  mainImages: ImageType[];

  slug: string;
  _id: string;
  developerDetails: {
    name: string;
    _id: string;
    image: ImageType

  }
  citiesDetails: {
    name: string;
    _id: string;
  }[]

  facilitiesAmenitiesDetails: {
    name: string;
    _id: string;
    image: ImageType
  }[]
}

