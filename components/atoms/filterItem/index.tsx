
interface IFilterItemProps {
    selected: string;
    value: string;
    onClick: (value: string) => void
}

const FilterItem = ({ selected, value, onClick }: IFilterItemProps) => {
    if (value === selected) {
        return (
            <>
                <div key={value} className="text-[14px] text-[#1E3A5F] font-medium">
                    {value}
                </div>
                <div className="border-b border-[#1E3A5F]" />
            </>
        )
    }

    return (
        <div key={value} className="text-[14px] text-[#64748B] font-medium cursor-pointer" onClick={() => onClick(value)}>
            {value}
        </div>
    )
}

export default FilterItem