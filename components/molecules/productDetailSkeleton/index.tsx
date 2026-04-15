const ProductDetailSkeleton = () => {
    return (
        <div
            className="flex flex-col md:flex-row gap-8 animate-pulse"
            aria-busy="true"
            aria-label="Loading product details"
        >
            <div className="flex justify-center items-center w-full md:w-[50%]">
                <div className="w-full max-w-[320px] h-[140px] rounded-lg bg-slate-200" />
            </div>
            <div className="flex flex-col gap-6 w-full md:w-[50%]">
                <div className="flex flex-col gap-3">
                    <div className="h-9 w-4/5 max-w-md rounded bg-slate-200" />
                    <div className="h-4 w-full rounded bg-slate-200" />
                    <div className="h-4 w-full rounded bg-slate-200" />
                    <div className="h-4 w-2/3 rounded bg-slate-200" />
                </div>
                <div className="h-8 w-28 rounded bg-slate-200" />
                <div className="flex flex-col gap-1">
                    <div className="h-4 w-20 rounded bg-slate-200" />
                    <div className="h-9 w-32 rounded-[10px] bg-slate-200" />
                </div>
                <div className="flex flex-row gap-4">
                    <div className="h-12 flex-1 max-w-[120px] rounded-[10px] bg-slate-200" />
                    <div className="h-12 flex-1 rounded-[10px] bg-slate-200" />
                </div>
                <div className="h-12 w-full rounded-[10px] bg-slate-200" />
            </div>
        </div>
    )
}

export default ProductDetailSkeleton
