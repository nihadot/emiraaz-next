export type FiltersState = {
    developers?: string[];
    facilities?: string[];
    propertyTypeSecond?: string;
    productTypeOptionFirst?: string;
    productTypeOptionLast?: string;
    emirate?: string;
    handoverDate?: HandoverDate;
    projectType?: string;
    furnishType?: string;
    bedAndBath?: string;
    minSqft?: string;
    maxSqft?: string;
    beds?: string;
    bath?: string;
    projectTypeFirst?: string
    projectTypeLast?: string;

    page?: number,
    limit?: number,
    search?: string,
    propertyType?: string[],
    propertyTypes?: string,
    completionType?: string,
    furnishing?: string,
    cities?: string[],
    year?: number | '',
    qtr?: string,
    paymentPlan?: string,
    discount?: string,
    maxPrice?: string,
    minPrice?: string,
};


type HandoverDate = {
    year?: number | "";
    quarter?: string | "";
};