import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICartState, ICartItem, ICartUpdateItemQuantityPayload } from './type';
import { stat } from 'fs';


const initialState: ICartState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state: ICartState, action: PayloadAction<ICartItem>) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id)

            if (itemIndex !== -1) {
                state.items[itemIndex].quantity += 1
            } else {
                state.items.push(action.payload)
            }
        },
        updateItemQuantity: (state: ICartState, action: PayloadAction<ICartUpdateItemQuantityPayload>) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id)

            if (itemIndex !== -1) {
                state.items[itemIndex].quantity = action.payload.quantity
            }
        },
        removeItem: (state: ICartState, action: PayloadAction<{ id: number }>) => {
            const filteredItems = state.items.filter(item => item.id !== action.payload.id)

            state.items = filteredItems
        },
        cleanCart: (state: ICartState) => {
            state.items = []
        }
    }
});

export const { addItem, updateItemQuantity, removeItem, cleanCart } = cartSlice.actions;
export default cartSlice.reducer;