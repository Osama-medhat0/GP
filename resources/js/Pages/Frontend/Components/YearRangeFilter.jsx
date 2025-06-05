import React from "react";

const YearRangeFilter = ({ formData, handleChange }) => {
    return (
        <div className="flex gap-2">
            <input
                type="number"
                name="year_min"
                placeholder="Min Year"
                value={formData.year_min}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                className="form-control w-full pl-1 pr-0 border rounded"
            />

            <input
                type="number"
                name="year_max"
                placeholder="Max Year"
                value={formData.year_max}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                className="form-control w-full pl-1 pr-0 border rounded"
            />
        </div>
    );
};

export default YearRangeFilter;
