import { useEffect } from "react";

type DialogProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};

export default function Dialog({ isOpen, onClose, title, children }: DialogProps) {

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            <div className="relative z-10 w-[90%] md:w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                {title && (
                    <div className="mb-4 text-lg font-semibold text-[0F172A]">{title}</div>
                )}

                {/* Content */}
                <div className="mb-4 max-h-[70vh] overflow-y-scroll">{children}</div>

                <div className="flex justify-end w-full">
                    <button
                        onClick={onClose}
                        className="rounded-lg bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300 w-full cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}