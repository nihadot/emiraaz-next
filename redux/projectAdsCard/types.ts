import { ImageType, Pagination } from "@/utils/types";


export type AllProjectAdsCards = {
  title: string;
  description: string;
  developerDetails: {
    _id: string;
    name: string;
  };
  projectDetails: {
    _id: string;
    name: string;
    slug: string;
  };
  startingDate: string;
  endingDate: string; 
  slug: string;
  _id: string;
  image?: ImageType

}

export type ViewProjectAdsCardsResponse = {
  success: boolean;
  message: string;
  data: AllProjectAdsCards[];
  pagination: Pagination;
}
