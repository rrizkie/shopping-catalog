import { IItem } from '@/type/item';

export type ICartItem = IItem & {
    quantity: number
}

export type ICartState = {
    items: ICartItem[]
}

export type ICartUpdateItemQuantityPayload = {
    id: number,
    quantity: number
}
