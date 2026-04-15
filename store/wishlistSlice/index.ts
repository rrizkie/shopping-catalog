import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWishlistState } from './type';
import { IItem } from '@/type/item';


const initialState: IWishlistState = {
    items: []
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state: IWishlistState, action: PayloadAction<IItem>) => {
            state.items.push(action.payload)
        },
        removeFromWishlist: (state: IWishlistState, action: PayloadAction<{ id: number }>) => {
            const filtered = state.items.filter(item => item.id !== action.payload.id)

            state.items = filtered
        }
    }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;