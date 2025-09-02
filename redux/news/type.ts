import { ImageType } from "@/utils/types";

  type NewCategoryDetailsType = {
    _id: string;
    name: string;
  };
  
  export type NewsItemType = {
    date: string; 
    image: ImageType;
    metaDescription: string;
    metaKeywords: string;
    metaTitle: string;
    newCategoryDetails: NewCategoryDetailsType;
    newsBody: {
      text: string;
      json: any;
      html: string;
    };
    newsTitle: string;
    slug: string;
    _id: string;
  };
  