'use client'

import { useState } from "react";
import FilterItem from "@/components/atoms/filterItem";
import { MdOutlineFilterAlt } from "react-icons/md";
import Dialog from "../Dialog";
import Checkbox from "@/components/atoms/checkbox";

interface IFilterProps {
    categories: string[]
    selectedCategory: string;
    onSelectCategory: (category: string) => void
    selectedRange: string;
    onSelectRange: (priceRange: string) => void
}

const Filter = ({ categories, selectedCategory, onSelectCategory, selectedRange, onSelectRange }: IFilterProps) => {
    const [filterDialog, setFilterDialog] = useState<boolean>(false)

    const PRICE_RANGE = [
        "1 - 50",
        "51 - 100",
        "> 100"
    ]

    return (
        <>
            {/** Mobile View */}
            <div className="md:hidden flex justify-center items-center border-2 border-[#1E3A5F] rounded-[10px] w-full py-2" onClick={() => setFilterDialog(true)}>
                <div className="flex flex-row gap-1 items-center">
                    <MdOutlineFilterAlt size={20} color="#0F172A" />
                    <p className="text-[16px] font-medium text-[#0F172A]">Filter</p>
                </div>
            </div>
            <Dialog isOpen={filterDialog} onClose={() => setFilterDialog(false)} title="Filter">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="text-[14px] font-semibold [#0F172A]">Category</div>
                        <Checkbox options={categories} selected={selectedCategory} onChange={onSelectCategory} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-[14px] font-semibold [#0F172A]">Price Range</div>
                        <Checkbox options={PRICE_RANGE} selected={selectedRange} onChange={onSelectRange} />
                    </div>
                </div>
            </Dialog>
            {/** Mobile View */}

            {/** Desktop View */}
            <div className="hidden md:flex flex-col items-start gap-8 min-w-[180px]">
                <div className="flex flex-row gap-1 items-center">
                    <MdOutlineFilterAlt size={20} color="#0F172A" />
                    <p className="text-[18px] font-semibold text-[#0F172A]">Filter</p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="text-[14px] font-semibold text-[#0F172A]">Category</div>
                    <div className="flex flex-col gap-2">
                        <FilterItem selected={selectedCategory} value="All" onClick={onSelectCategory} />
                        {categories.map(category => <FilterItem key={category} selected={selectedCategory} value={category} onClick={onSelectCategory} />)}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="text-[14px] font-semibold text-[#0F172A]">Price Range</div>
                    <div className="flex flex-col gap-2">
                        <FilterItem selected={selectedRange} value="All" onClick={onSelectRange} />
                        {PRICE_RANGE.map(price => <FilterItem key={price} selected={selectedRange} value={price} onClick={onSelectRange} />)}
                    </div>
                </div>
            </div>
            {/** Desktop View */}
        </>
    )
}

export default Filter