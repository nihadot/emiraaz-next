

export type NewsImage = {
  webp?: {
    key?: string;
    url?: string;
  };
};

export type NewsCategoryDetails = {
  _id?: string;
  name?: string;
};

export type NewsBody = {
  html?: string;
  text?: string;
  json?: unknown;
};

export type NewsItem = {
  _id?: string;

  newsTitle?: string;
  slug?: string;
  date?: string;

  altText?: string;

  image?: NewsImage;

  newCategoryDetails?: NewsCategoryDetails;

  newsBody?: NewsBody;

  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
};
