'use client'

import { useMemo, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { CiHeart } from "react-icons/ci";
import Breadcrumb from "@/components/atoms/breadcrumb"
import Counter from "@/components/atoms/counter"
import { useGetProductById, useGetProducts } from "@/services/product/query"
import { useAppDispatch, useAppSelector } from "@/store"
import { addItem } from "@/store/cartSlice"
import { ICartItem } from "@/store/cartSlice/type";
import { addToWishlist, removeFromWishlist } from "@/store/wishlistSlice"
import { IItem } from "@/type/item";
import ProductDetailSkeleton from "@/components/molecules/productDetailSkeleton"
import ProductSugestion from "./productSuggestion";
import { toast } from "react-toastify";


const ProductDetail = () => {
    const { id } = useParams()

    const dispatch = useAppDispatch()
    const wishlist = useAppSelector(state => state.wishlist.items)
    const isItemWishlisted = wishlist.find(item => item.id === +id!)

    const { data: productDetail, isPending: isLoadingProduct } = useGetProductById(id as string)
    const { data: products, isFetching: isLoadingProducts } = useGetProducts()

    const [counter, setCounter] = useState<number>(1)

    const breadcrumbs: string[] = [
        "Product",
        ...(productDetail?.title ? [productDetail.title] : []),
    ]

    const otherProducts = useMemo(() => {
        return products?.filter(product => product.id !== +id!).slice(0, 4)
    }, [products, id])

    const handleWishlist = () => {
        const wishlistItem = wishlist.find(item => item.id === +id!)

        if (wishlistItem) {
            dispatch(removeFromWishlist({ id: +id! }))
            toast.success("Successfully removing item from wishlist")
            return
        }

        dispatch(addToWishlist(productDetail as IItem))
        toast.success("successfully adding item to wishlist")
    }

    const handleAddToCard = () => {
        dispatch(addItem({ ...productDetail as ICartItem, quantity: counter }))
        toast.success("successfully adding item to cart")
    }

    return (
        <div className="flex flex-col gap-8 px-8 pt-4 pb-8">
            <Breadcrumb paths={breadcrumbs} />
            {isLoadingProduct ? (
                <ProductDetailSkeleton />
            ) : (
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex justify-center items-center w-full md:w-[50%]">
                        <Image src={productDetail?.image as string} alt={productDetail?.title as string} width={320} height={140} loading="lazy" />
                    </div>
                    <div className="flex flex-col gap-6 w-full md:w-[50%]">
                        <div>
                            <div className="text-[30px] md:text-[36px] text-[#0F172A] font-semibold">{productDetail?.title}</div>
                            <div className="text-[14px] text-[#64748B]">{productDetail?.description}</div>
                        </div>
                        <div className="text-[30px] text-[#0F172A]">
                            ${productDetail?.price}
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-[14px] text-[#0F172A] font-medium">Category</div>
                            <div className="bg-[#F1F5F9] boder border-[#E5E7EB] text-[14px] text-[#1E3A5F] font-medium rounded-[10px] p-2 w-fit">{productDetail?.category}</div>
                        </div>
                        <div className="flex flex-row gap-4">
                            <Counter counter={counter} onChange={setCounter} />
                            <div className={`flex flex-row justify-center items-center gap-2 border-2 ${isItemWishlisted ? "border-[#1E3A5F] bg-[#1E3A5F] text-[#FFFFFF]" : "border-[#E5E7EB] text-[#0F172A]"} rounded-[10px] w-full p-3 cursor-pointer`} onClick={handleWishlist}>
                                <CiHeart size={24} />
                                <div>Wishlist</div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center text-[16px] text-[#FFFFFF] font-medium bg-[#1E3A5F] rounded-[10px] p-3 cursor-pointer" onClick={handleAddToCard}>
                            Add to Cart
                        </div>
                    </div>
                </div>
            )}
            <ProductSugestion products={otherProducts as IItem[]} loading={isLoadingProducts} />
        </div>
    )
}

export default ProductDetail