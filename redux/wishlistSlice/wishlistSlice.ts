import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllWishlistItems } from '../wishlist/types';
import { WishlistState } from './types';


const initialState:WishlistState = {
    items: [],  // Global wishlist array
    loading: false,
    error: null,
};


type WishlistItem = {
    _id:string;
    propertyDetails:AllWishlistItems
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
      
        // Set loading state for async operations
        wishlistLoading(state) {
            state.loading = true;
            state.error = null;
        },

          // Set the entire wishlist (useful for initial loading)
          setWishlist(state, action: PayloadAction<any[]>) {
            state.items = action.payload;  // Set the wishlist globally
        },

        // Handle failure for wishlist-related actions
        wishlistFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

      
    },
});

export const {
    wishlistLoading,
    wishlistFailure,
    setWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
