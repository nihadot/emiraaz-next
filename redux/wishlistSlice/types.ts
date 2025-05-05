import { AllWishlistItems } from "../wishlist/types";


export interface WishlistState {
    items: WishlistItem[];  // Array to hold wishlist items
    loading: boolean;        // Boolean for loading state
    error: string | null;    // To store errors
}



type WishlistItem = {
    _id:string;
    propertyDetails:AllWishlistItems
}