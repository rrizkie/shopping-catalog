
interface ICheckboxProps {
    options: string[]
    selected: string
    onChange: (value: string) => void
}

const Checkbox = ({ options, selected, onChange }: ICheckboxProps) => {
    return (
        <div>
            <div key={"All"} className="flex flex-row gap-1">
                <input type="checkbox" id="All" checked={selected === "All"} onChange={() => onChange("All")} />
                <label htmlFor="All">All</label>
            </div>
            {options.map(option => (
                <div key={option} className="flex flex-row gap-1">
                    <input type="checkbox" id={option} checked={selected === option} onChange={() => onChange(option)} />
                    <label htmlFor={option}>{option}</label>
                </div>

            ))}
        </div>
    )
}

export default Checkbox