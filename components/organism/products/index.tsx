'use client'

import { useMemo, useState } from "react";
import Banner from "@/components/molecules/banner"
import Filter from "@/components/molecules/filter"
import { useGetProducts } from "@/services/product/query"
import { IItem } from "@/type/item"
import { useRouter, useSearchParams } from "next/navigation";
import CardItem from "@/components/molecules/cardItem";
import CardItemSkeleton from "@/components/molecules/CardSkeleton";

const ProductsPage = () => {
    const { replace, push } = useRouter()
    const searchParam = useSearchParams()
    const category = searchParam.get("category")
    const priceRange = searchParam.get("range")

    const { data: products, isFetching: isLoadingProducts } = useGetProducts()

    const [loading, setLoading] = useState<boolean>(false)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(category ?? "All")
    const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(priceRange ?? "All")

    const categories = useMemo(() => {
        if (!products) return [];
        return products.reduce((acc: string[], item: IItem) => {
            if (!acc.includes(item.category)) acc.push(item.category);
            return acc;
        }, []);
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        return products.filter((product) => {
            setLoading(true)
            const matchesCategory =
                !selectedCategory || product.category === selectedCategory || selectedCategory === "All";

            const matchesPriceRange = (() => {
                if (!selectedPriceRange) return true;

                if (selectedPriceRange === "All") {
                    return true
                }

                if (selectedPriceRange === "1 - 50") {
                    return product.price >= 1 && product.price <= 50;
                }

                if (selectedPriceRange === "51 - 100") {
                    return product.price >= 51 && product.price <= 100;
                }

                if (selectedPriceRange === "> 100") {
                    return product.price > 100;
                }

                return true;
            })();

            setLoading(false)
            return matchesCategory && matchesPriceRange;
        });
    }, [products, selectedCategory, selectedPriceRange])

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category)
        if (priceRange) {
            replace(`?category=${category}&range=${priceRange}`)
            return
        }
        replace(`?category=${category}`)
    }

    const handleSelectPriceRange = (range: string) => {
        setSelectedPriceRange(range)
        if (category) {
            replace(`?category=${category}&range=${range}`)
            return
        }
        replace(`?range=${range}`)
    }

    const handleClickDetail = (id: number) => {
        push(`/product/${id}`)
    }

    return (
        <div className="flex flex-col">
            <Banner />
            <div className="flex flex-col md:flex-row items-start gap-8 px-8 py-8">
                <Filter categories={categories} selectedCategory={selectedCategory as string} onSelectCategory={handleSelectCategory} selectedRange={selectedPriceRange as string} onSelectRange={handleSelectPriceRange} />
                <div className="flex flex-col gap-8">
                    <div className="text-[20px] font-semibold text-[#0F172A]">Items</div>
                    <div className="flex flex-wrap gap-8">
                        {(isLoadingProducts || loading) && Array.from({ length: 3 }).map((_, index) => (
                            <CardItemSkeleton key={index} />

                        ))
                        }
                        {!isLoadingProducts && filteredProducts.map(product => (
                            <CardItem key={product.id} product={product} onClick={handleClickDetail} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsPage