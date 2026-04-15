'use client'

import { usePathname, useRouter } from "next/navigation";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { useState } from "react";
import { useAppSelector } from "@/store";
import WishlistDialog from "../WishlistDialog";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
    const { push } = useRouter()
    const pathname = usePathname()
    const menus = ["Home"]

    const cartItems = useAppSelector((state) => state.cart.items)
    const cartCount = cartItems.length

    const wishlistItems = useAppSelector((state) => state.wishlist.items)
    const wishlistCount = wishlistItems.length

    const [isOpenWishlistDialog, setIsOpenWishlistDialog] = useState<boolean>(false)

    const handleRedirect = (menu: string) => {
        switch (menu) {
            case "Home":
                return push("/")

            default:
                return push('/')
        }
    }

    const handleClickTitle = () => {
        push("/")
    }

    const handleWishlistDialog = () => {
        setIsOpenWishlistDialog(val => !val)
    }

    const handleCart = () => {
        push("/cart")
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/** HEADER */}
            <div className="flex justify-between items-center px-4 md:px-8 py-3 min-h-[65px] border border-[#E5E7EB]">
                <div className="flex flex-row items-center gap-8">
                    <div className="brandTitle" onClick={handleClickTitle}>Shopii</div>
                    <div className="hidden md:flex flex-row items-center gap-8">
                        {menus.map(menu => (
                            <div key={menu} className={menu === "Home" ? "menu-active" : "menu-inactive"} onClick={() => handleRedirect(menu)}>{menu}</div>

                        ))}
                    </div>
                </div>
                <div className="flex flex-row items-center gap-4 md:gap-8">
                    <div className="relative cursor-pointer" onClick={handleCart}>
                        <CiShoppingCart size={20} color="#1e3a5f" />
                        {cartCount > 0 ? (
                            <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-0.5 flex items-center justify-center rounded-full bg-[#1E3A5F] text-[10px] font-semibold text-white leading-none">
                                {cartCount > 99 ? "99+" : cartCount}
                            </span>
                        ) : null}
                    </div>
                    <div className="relative cursor-pointer" onClick={handleWishlistDialog}>
                        <CiHeart size={20} color="#1e3a5f" />
                        {wishlistCount > 0 ? (
                            <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-0.5 flex items-center justify-center rounded-full bg-[#1E3A5F] text-[10px] font-semibold text-white leading-none">
                                {wishlistCount > 99 ? "99+" : wishlistCount}
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>
            {/** End of HEADER */}

            <div className="flex-1">
                {children}
            </div>

            {/** FOOTER */}
            <div className="mt-auto flex w-full">
                <div className="flex flex-col py-8 md:flex-row md:justify-between items-center gap-4 bg-[#0F172A] px-4 md:px-8 text-white min-h-[152px] h-full w-full">
                    <div>
                        <div className="text-[20px] text-center">Shopii</div>
                        <div className="text-[14px] text-[#94A3B8]">© 2026 Shopii. All rights reserved.</div>
                    </div>
                    <div className="flex flex-row items-center gap-8">
                        {menus.map(menu => (
                            <div key={menu} className={"menu-inactive"} onClick={() => handleRedirect(menu)}>{menu}</div>

                        ))}
                    </div>
                    <div className="flex flex-row items-center gap-8">
                        <div className="p-2.5 bg-[#1E293B] rounded-full cursor-pointer">
                            <FaFacebook />
                        </div>
                        <div className="p-2.5 bg-[#1E293B] rounded-full cursor-pointer">
                            <FaTwitter />
                        </div>
                        <div className="p-2.5 bg-[#1E293B] rounded-full cursor-pointer">
                            <FaYoutube />

                        </div>
                    </div>
                </div>
            </div>
            {/** END FOOTER */}
            <WishlistDialog isOpen={isOpenWishlistDialog} onClose={handleWishlistDialog} />
        </div>
    )
}

export default BaseLayout