import Image from "next/image"
import BannerImage from "@/assets/image/banner.png"

const Banner = () => {
    return (
        <div className="relative w-full h-[200px] md:h-[350px]">
            <Image src={BannerImage} alt="banner" fill loading="eager" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <h1 className="text-3xl md:text-5xl font-bold">
                    Big Deals Are Here
                </h1>
                <p className="mt-4 text-lg md:text-xl">
                    Save more on your favorite items with exclusive offers and limited-time discounts.
                </p>
            </div>

        </div>
    )
}

export default Banner