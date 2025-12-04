export type EmirateFetchAllNamesResponse = {
    success:string,
    message:string,
    data:EmirateNames[]
}


export type EmirateNames = {
    _id:string;
    name:string;
    count:number;
    slug:string;
}



export type EmirateFetchAllItemsResponse = {
    success:string,
    message:string,
    data:EmirateItem[],
    pagination:PaginationType,
}


type PaginationType = {
    currentPage: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
}


export type EmirateItemsFetchByIdResponse = {
    success:string,
    data:EmirateItem,
}

export type EmirateItemsFetchByIdPayload = {
    id:string,
}



type EmirateItem = {
    name: string | undefined;
    slug: string;
    _id: string;
}
export type FetchEmirateByCityByIdResponse = {
    success: string,
    data: {
        name: string;
        _id: string;
    },
}
