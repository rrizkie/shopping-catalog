import { IItem } from "@/type/item"
import CardItem from "@/components/molecules/cardItem"
import { useRouter } from "next/navigation"
import CardItemSkeleton from "@/components/molecules/CardSkeleton"

interface IProductSuggestionProps {
    products: IItem[]
    loading: boolean
}

const ProductSugestion = ({ products, loading }: IProductSuggestionProps) => {
    const { push } = useRouter()

    const handleMoreProducts = () => {
        push("/")
    }

    return (
        <div className="flex flex-col gap-4 pt-8">
            <div className="flex flex-row justify-between items-center">
                <div className="text-[20px] md:text-[24px] text-[#0F172A] font-semibold">
                    You might also like
                </div>
                <div className="text-[14px] text-[#1E3A5F] font-medium cursor-pointer" onClick={handleMoreProducts}>
                    More Products
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                {loading && Array.from({ length: 4 }).map((_, index) => (
                    <CardItemSkeleton key={index} />

                ))
                }
                {!loading && products?.map(product => (
                    <CardItem key={product.id} product={product} showDescription={false} />
                ))}
            </div>
        </div>
    )
}

export default ProductSugestion