import { Pagination } from "@/utils/types";

// Basic Type
export interface Item {
  _id: string;
  questions: {
    question: string;
    options: string[];
    _id:string;
  }[];
  title: string;
  content: string;
}


// 4. Fetch By ID
export interface FetchByIDResponse {
  success: boolean;
  data: Item;
}

export interface FetchByIDResponse {
  success: boolean;
  data: Item;
}

export interface FetchByIDPayload {
  slug: string;
}

export interface EnquiryPayload { 
  answers: {
    questionId: string;
    answer: string;
  }[]
  slug: string;
  name: string;
  number: string;
  
}


// Fetch by ID
export interface FetchItemByIdResponseItem extends FetchByIDResponse { }
export interface FetchItemByIdPayloadItem extends FetchByIDPayload { }


// Base Entity
export interface ItemEntity extends Item { }
