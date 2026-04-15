'use client'

import Counter from "@/components/atoms/counter"
import { useAppDispatch, useAppSelector } from "@/store"
import { cleanCart, removeItem, updateItemQuantity } from "@/store/cartSlice"
import Image from "next/image"
import { useMemo } from "react"
import { toast } from "react-toastify"
import { FaRegTrashAlt } from "react-icons/fa";

const Cart = () => {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(state => state.cart.items)

    const total = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            return acc + item.price * item.quantity
        }, 0)
    }, [cartItems])

    const handleRemoveItem = (id: number) => {
        dispatch(removeItem({ id }))
        toast.success("Successfully removing item from cart")
    }

    const handleUpateQty = (id: number, qty: number) => {
        dispatch(updateItemQuantity({ id, quantity: qty }))
    }

    const handleCheckout = () => {
        dispatch(cleanCart())
        toast.success("Successfully checkout")
    }

    return (
        <div className="flex flex-col gap-8 px-8 pt-4 pb-8">
            <div className="text-[24px] text-[#0F172A] font-semibold">Cart</div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-4 w-full md:w-[70%]">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex flex-col md:flex-row items-center gap-8 border border-[#E5E7EB] p-3 rounded-[10px]">
                            <Image src={item.image} alt={item.title} width={160} height={80} />
                            <div className="flex flex-col justify-between h-full">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-row justify-between">
                                        <div className="text-[16px] text-[#0F172A] font-semibold">{item.title}</div>
                                        <FaRegTrashAlt size={20} color="#0F172A" className="cursor-pointer" onClick={() => handleRemoveItem(item.id)} />
                                    </div>
                                    <div className="text-[14px] text-[#64748B]">{item.description}</div>
                                    <div className="text-[20px] text-[#0F172A] font-semibold">${item.price}</div>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <Counter counter={item.quantity} onChange={(qty) => handleUpateQty(item.id, qty)} />
                                    <div className="text-[20px] text-[#0F172A] font-semibold">
                                        ${item.quantity * item.price}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full md:w-[30%]">
                    <div className="flex flex-col gap-8 border border-[#E5E7EB] rounded-[10px] p-3">
                        <div className="text-[16px] text-[#0F172A] font-semibold">Summary</div>
                        <div className="flex flex-row justify-between items-center">
                            <div className="text-[20px] text-[#0F172A] font-semibold">Total</div>
                            <div className="text-[20px] text-[#0F172A] font-semibold">${(total.toFixed(2))}</div>
                        </div>
                        <div className="flex justify-center items-center text-[16px] text-[#FFFFFF] font-medium bg-[#1E3A5F] rounded-[10px] p-3 cursor-pointer" onClick={handleCheckout}>
                            Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart