export type BlogBody = {
  html?: string;
  text?: string;
  json?: unknown;
};

export type BlogCategory = {
  _id?: string;
  name?: string;
};

export type BlogImage = {
  webp?: {
    key?: string;
    url?: string;
  };
};

export type Blog = {
  _id?: string;
  blogTitle?: string;
  altText?: string;
  slug?: string;
  date?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  blogBody?: BlogBody;
  blogCategoryDetails?: BlogCategory;
  image?: BlogImage;
};

export type BlogApiResponse = {
  success?: boolean;
  data?: Blog;
};
