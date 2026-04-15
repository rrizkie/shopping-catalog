const CardItemSkeleton = () => {
    return (
        <div
            className="flex flex-col border border-[#E5E7EB] rounded-[14px] w-full md:w-1/4 py-5 animate-pulse"
            aria-busy="true"
        >
            <div className="w-full h-[160px] bg-slate-200" />

            <div className="flex flex-col gap-4 px-5 pt-5">
                <div className="flex flex-row gap-2 items-center">
                    <div className="h-5 w-5 rounded bg-slate-200" />
                    <div className="h-4 w-10 rounded bg-slate-200" />
                    <div className="h-4 w-3 rounded bg-slate-200" />
                    <div className="h-4 w-20 rounded bg-slate-200" />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="h-[50px] rounded bg-slate-200" />
                    <div className="h-4 w-24 rounded bg-slate-200" />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="h-4 rounded bg-slate-200" />
                    <div className="h-4 rounded bg-slate-200" />
                    <div className="h-4 w-3/4 rounded bg-slate-200" />
                </div>

                <div className="border-b border-[#E5E7EB]" />

                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <div className="h-3 w-16 rounded bg-slate-200" />
                        <div className="h-6 w-24 rounded bg-slate-200" />
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <div className="h-4 w-12 rounded bg-slate-200" />
                        <div className="h-4 w-4 rounded bg-slate-200" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardItemSkeleton