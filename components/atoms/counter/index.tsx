import { FiMinus, FiPlus } from "react-icons/fi";

interface ICounterProps {
    counter: number;
    onChange: (val: number) => void
}

const Counter = ({ counter, onChange }: ICounterProps) => {
    const handleChange = (type: "plus" | "minus") => {
        if (type === "minus") {
            if (counter === 1) return

            onChange(counter - 1)

            return
        }

        onChange(counter + 1)
    }

    return (
        <div className="flex flex-row items-center border border-[#E5E7EB] rounded-[10px] w-fit">
            <div className="border-r border-[#E5E7EB] p-3 cursor-pointer" onClick={() => handleChange("minus")}>
                <FiMinus color="#0A0A0A" />
            </div>
            <div className="text-[14px] text-[#0A0A0A] font-medium px-4">
                {counter}
            </div>
            <div className="border-l border-[#E5E7EB] p-3 cursor-pointer" onClick={() => handleChange("plus")}>
                <FiPlus color="#0A0A0A" />
            </div>
        </div>
    )
}

export default Counter