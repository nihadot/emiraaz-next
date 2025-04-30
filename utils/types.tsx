export type ImageType = {
    asset_id: string;
    secure_url: string;
    url: string;
    public_id: string;
};

export type Pagination = {
    currentPage: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
  };
  
  export type PayloadByIdResponse = {
    id: string;
  }
  