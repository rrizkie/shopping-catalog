import { FaChevronRight } from "react-icons/fa";

interface IBreadcrumProps {
    paths: string[]
}

const Breadcrumb = ({ paths }: IBreadcrumProps) => {
    return (
        <div className="flex flex-row items-center gap-2">
            {paths.map((path, index) => (
                <div key={path} className="flex flex-row items-center gap-2">
                    {index !== 0 && <FaChevronRight size={12} color="#64748B" />}
                    <div className={`text-[12px] md:text-[14px] ${index === paths.length - 1 ? "text-[#1E3A5F] font-medium" : "text-[#64748B]"}`}>{path}</div >
                </div>
            )
            )}
        </div >
    )
}

export default Breadcrumb