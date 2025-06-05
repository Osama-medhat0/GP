import { useState } from "react";
import { FaTag } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";

export default function PriceRangeFilter({ priceMin, priceMax, setFormData }) {
    const [errors, setErrors] = useState({ min: "", max: "" });

    const handleMinChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, "");
        const numericValue = Number(rawValue);
        const toastId = "minPriceExceeded";

        if (!isNaN(numericValue)) {
            if (numericValue <= 50000000) {
                setFormData((prev) => ({
                    ...prev,
                    price_min: numericValue,
                }));
                setErrors((prev) => ({ ...prev, min: "" }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    min: "Minimum price cannot exceed 50,000,000",
                }));
                if (!toast.isActive(toastId)) {
                    toast.warn("Minimum price cannot exceed 50,000,000", {
                        toastId,
                    });
                }
            }
        }
    };

    const handleMaxChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, "");
        const numericValue = Number(rawValue);
        const toastId = "maxPriceExceeded";

        if (!isNaN(numericValue)) {
            if (numericValue <= 50000000) {
                setFormData((prev) => ({
                    ...prev,
                    price_max: numericValue,
                }));
                setErrors((prev) => ({ ...prev, max: "" }));

                // Dismiss the toast if it's active and value is corrected
                if (toast.isActive(toastId)) {
                    toast.dismiss(toastId);
                }
            } else {
                setErrors((prev) => ({
                    ...prev,
                    max: "Maximum price cannot exceed 50,000,000",
                }));

                // Show the warning only if not already visible
                if (!toast.isActive(toastId)) {
                    toast.warn("Maximum price cannot exceed 50,000,000", {
                        toastId,
                    });
                }
            }
        }
    };

    return (
        <div className="form-control">
            <details className="mb-4">
                <summary className="flex justify-between items-center cursor-pointer mb-2 text-gray-500 text-sm">
                    {priceMin || priceMax !== 20000000 ? (
                        <span>
                            EGP{" "}
                            {priceMin ? Number(priceMin).toLocaleString() : 0}{" "}
                            to EGP{" "}
                            {priceMax ? Number(priceMax).toLocaleString() : 0}
                        </span>
                    ) : (
                        "Min to Max Price"
                    )}
                    <FaChevronDown className="ml-2 w-3 mt-2.5" />
                </summary>

                {/* Min/Max inputs */}
                <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-1.5 mt-4 bg-gray-50">
                    <div className="flex items-center flex-1 border rounded px-2 py-1 min-w-[150px]">
                        <FaTag className="text-gray-400 mr-2" />
                        <input
                            min={0}
                            value={
                                priceMin
                                    ? Number(priceMin).toLocaleString()
                                    : ""
                            }
                            onChange={handleMinChange}
                            placeholder="Min"
                            className="w-full outline-none bg-transparent"
                        />
                    </div>

                    <div className="flex items-center flex-1 border rounded px-2 py-1 min-w-[150px]">
                        <FaTag className="text-gray-400 mr-2" />
                        <input
                            min={0}
                            value={
                                priceMax
                                    ? Number(priceMax).toLocaleString()
                                    : ""
                            }
                            onChange={handleMaxChange}
                            placeholder="Max"
                            className="w-full outline-none bg-transparent"
                        />
                    </div>
                </div>
            </details>
        </div>
    );
}
