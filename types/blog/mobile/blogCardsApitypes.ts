export interface ApiBlogItem {
  _id?: string;
  slug?: string;
  blogTitle?: string;
  date?: string;

  blogBody?: {
    text?: string;
    html?: string;
    json?: {
      type?: string;
      content?: unknown[];
    };
  };

  blogCategoryDetails?: {
    _id?: string;
    name?: string;
  };

  image?: {
    webp?: {
      key?: string;
      url?: string;
    };
  };
}