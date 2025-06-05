import { useState } from "react";
import { FaTachometerAlt } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";

export default function MileageRangeFilter({ formData, setFormData }) {
    const [minMileage, setMinMileage] = useState(formData.mileage_min || 0);
    const [maxMileage, setMaxMileage] = useState(
        formData.mileage_max || 1000000
    );

    const [errors, setErrors] = useState({ min: "", max: "" });

    const handleMinChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, "");
        const numericValue = Number(rawValue);
        const toastId = "minMileageExceeded";
        if (!isNaN(numericValue)) {
            if (numericValue <= 2000000) {
                setMinMileage(numericValue);
                setErrors((prev) => ({ ...prev, min: "" }));
                setFormData((prev) => ({
                    ...prev,
                    mileage_min: numericValue,
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    min: "Minimum mileage cannot exceed 2,000,000",
                }));
                if (!toast.isActive(toastId))
                    toast.warn("Minimum mileage cannot exceed 2,000,000", {
                        toastId,
                    });
            }
        }
    };

    const handleMaxChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, "");
        const numericValue = Number(rawValue);
        const toastId = "maxMileageExceeded";

        if (!isNaN(numericValue)) {
            if (numericValue <= 2000000) {
                setMaxMileage(numericValue);
                setErrors((prev) => ({ ...prev, max: "" }));
                setFormData((prev) => ({
                    ...prev,
                    mileage_max: numericValue,
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    max: "Maximum mileage cannot exceed 2,000,000",
                }));
                if (!toast.isActive(toastId))
                    toast.warn("Maximum mileage cannot exceed 2,000,000", {
                        toastId,
                    });
            }
        }
    };

    return (
        <div className="form-control">
            <details className="mb-4">
                <summary className="flex justify-between items-center cursor-pointer mb-2 text-gray-500 text-sm">
                    {minMileage || maxMileage !== 500000 ? (
                        <span>
                            {minMileage ? minMileage.toLocaleString() : 0} km to{" "}
                            {maxMileage ? maxMileage.toLocaleString() : 0} km
                        </span>
                    ) : (
                        "Min to Max Mileage"
                    )}
                    <FaChevronDown className="ml-2 w-3 mt-2.5" />
                </summary>

                <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-1.5 mt-4 bg-gray-50">
                    <div className="flex items-center flex-1 border rounded px-2 py-1 min-w-[150px]">
                        <FaTachometerAlt className="text-gray-400 mr-2" />
                        <input
                            min={0}
                            value={
                                minMileage === 0
                                    ? ""
                                    : minMileage.toLocaleString()
                            }
                            onChange={handleMinChange}
                            placeholder="Min"
                            className="w-full outline-none bg-transparent"
                        />
                    </div>

                    <div className="flex items-center flex-1 border rounded px-2 py-1 min-w-[150px]">
                        <FaTachometerAlt className="text-gray-400 mr-2" />
                        <input
                            min={0}
                            value={
                                maxMileage === 0
                                    ? ""
                                    : maxMileage.toLocaleString()
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
