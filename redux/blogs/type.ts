import { ImageType } from "@/utils/types";


export type AllBlogItems = {
  _id: string,
  slug: string,
  blogTitle: string;
  metaTitle?: string;
  metaKeywords?: string;
  blogCategoryDetails?: {
      _id: string,
      name:string
  };
  image?: ImageType;
  metaDescription?: string;
  date?: string;
  blogBody?: string
}



