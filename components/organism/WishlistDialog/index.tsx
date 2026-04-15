import Dialog from "@/components/molecules/Dialog";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeFromWishlist } from "@/store/wishlistSlice";
import { toast } from "react-toastify";

interface IWishlistDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const WishlistDialog = ({ isOpen, onClose, }: IWishlistDialogProps) => {
    const dispatch = useAppDispatch()
    const wishlistItems = useAppSelector((state) => state.wishlist.items)

    const handleRemoveWishlist = (id: number) => {
        dispatch(removeFromWishlist({ id }))
        toast.success("Successfully removing item from wishlist")
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose} title="Wishlist">
            <div className="flex flex-col gap-4">
                {wishlistItems.map(item => (
                    <div key={item.id} className="flex flex-col md:flex-row justify-between items-center border border-[#E5E7EB] rounded-[10px] p-3">
                        <div className="flex flex-row items-center gap-4">
                            <Image src={item.image} alt={item.title} width={80} height={40} />
                            <div className="flex flex-col gap-2">
                                <div className="text-[16px] font-medium text-[#0F172A]">{item.title}</div>
                                <div className="text-[14px] text-[#64748B]">${item.price}</div>
                            </div>
                        </div>
                        <FaHeart size={30} color="#0F172A" className="cursor-pointer" onClick={() => handleRemoveWishlist(item.id)} />
                    </div>
                ))}
            </div>
        </Dialog>
    )
}

export default WishlistDialog