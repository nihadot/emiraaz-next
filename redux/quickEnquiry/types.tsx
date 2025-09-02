import { Pagination } from "@/utils/types";

// Basic Type
export interface ItemPayload {
  name: string;
  number: string;
  notes: string;
  email: string;
}

export interface Item {
  success: boolean;
  data: ItemPayload & {
    _id: string;
  };
}
  

interface FetchByIDResponse extends Item {}


export interface FetchByIDPayload {
  slug: string;
}

export interface EnquiryPayload extends ItemPayload { }


// Fetch by ID
export interface FetchItemByIdResponseItem extends FetchByIDResponse { }
export interface FetchItemByIdPayloadItem extends FetchByIDPayload { }


// Base Entity
export interface ItemEntity extends ItemPayload { }
