import Image from "next/image";
import { IItem } from "@/type/item";
import { FaChevronRight, FaRegStar } from "react-icons/fa";

interface ICardItemProps {
    product: IItem
    onClick?: (id: number) => void
    showDescription?: boolean
}

const CardItem = ({ product, onClick, showDescription = true }: ICardItemProps) => {
    return (
        <div
            key={product.id}
            className="group flex flex-col border border-[#E5E7EB] rounded-[14px] w-full md:w-1/4 py-5 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:border-[#CBD5E1] will-change-transform"
        >
            <div className="relative w-full h-[160px] overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                    loading="eager"
                />
            </div>
            <div className="flex flex-col gap-4 px-5 pt-5">
                <div className="flex flex-row gap-1">
                    <FaRegStar size={20} color="#0F172A" />
                    <div className="text-[#0F172A]">{product.rating.rate}</div>
                    <div>-</div>
                    <div className="text-[#64748B]">{product.rating.count} sold</div>
                </div>
                <div className="flex flex-col">
                    <div className="text-[16px] font-semibold text-[#0F172A] h-[50px] overflow-hidden text-ellipsis">{product.title}</div>
                    <div className="text-[12px] font-medium text-[#64748B]">{product.category}</div>
                </div>
                {showDescription && <div className="text-[14px] text-[#64748B] wrap-break-word line-clamp-3">
                    {product.description}
                </div>}

                <div className="border-b border-[#E5E7EB]" />

                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <div className="text-[12px] text-[#64748B]">Starting at</div>
                        <div className="text-[20px] font-semibold text-[#1E3A5F]">${product.price}</div>
                    </div>

                    <div className="flex flex-row items-center gap-2 text-[14px] font-medium text-[#1E3A5F] cursor-pointer" onClick={() => onClick?.(product.id)}>
                        <div>
                            View
                        </div>
                        <FaChevronRight />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardItem