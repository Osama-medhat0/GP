import PriceRangeFilter from "./PriceRangeFilter";
import MileageRangeFilter from "./MileageRangeFilter";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";
import YearRangeFilter from "./YearRangeFilter";

const CarMakeInput = ({ formData, carMakes, setFormData, handleChange }) => {
    // console.log("carMakes in CarMakeInput:", carMakes);

    const [suggestions, setSuggestions] = useState([]);

    const capitalizeFirstLetter = (string) => {
        if (!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const handleInputChange = (e) => {
        let value = e.target.value;

        // Capitalize first letter while typing
        const capitalizedValue = capitalizeFirstLetter(value);

        handleChange({ target: { name: "make", value: capitalizedValue } });

        if (value) {
            const filtered = carMakes.filter((make) =>
                make.name.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (make) => {
        const capitalizedMake = capitalizeFirstLetter(make.name);
        handleChange({ target: { name: "make", value: capitalizedMake } });
        setFormData({
            ...formData,
            make: capitalizedMake,
            make_id: make.id,
            model: "",
        });
        setSuggestions([]);
    };

    const handleBlur = () => {
        setTimeout(() => {
            const matchedMake = carMakes.find(
                (make) =>
                    make.name.toLowerCase() === formData.make.toLowerCase()
            );

            const toastId = "invalidMake";

            if (matchedMake) {
                // Set make_id if user typed it manually
                setFormData((prev) => ({
                    ...prev,
                    make: matchedMake.name, // Capitalized correctly
                    make_id: matchedMake.id,
                    model: "", // Reset model
                }));
            } else {
                if (!toast.isActive(toastId)) {
                    toast.warn(
                        "Invalid make selected. Please choose from the suggestions.",
                        { toastId }
                    );
                }

                setFormData((prev) => ({ ...prev, make: "", make_id: null }));
            }

            setSuggestions([]);
        }, 150);
    };

    return (
        <div className="relative ">
            <input
                type="text"
                name="make"
                placeholder="Select make"
                value={formData.make}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className="form-control w-full p-2  border rounded sm:pl-20 "
            />
            {suggestions.length > 0 && (
                <ul className="absolute w-full bg-white border rounded mt-1">
                    {suggestions.map((make) => (
                        <li
                            className="p-2 hover:bg-gray-200 cursor-pointer text-black"
                            key={make.id}
                            onMouseDown={() => handleSelect(make)} // Prevent blur before click
                        >
                            {make.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const CarModelInput = ({ formData, handleChange, carModels, setFormData }) => {
    const [suggestions, setSuggestions] = useState([]);

    const capitalizeFirstLetter = (string) => {
        if (!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const handleInputChange = (e) => {
        let value = e.target.value;

        // Capitalize first letter while typing
        const capitalizedValue = capitalizeFirstLetter(value);

        handleChange({ target: { name: "model", value: capitalizedValue } });

        const filteredModels = carModels.filter(
            (model) => model.car_make_id === formData.make_id
        );

        if (value) {
            const filtered = filteredModels.filter((model) =>
                model.name.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (model) => {
        const capitalizedModel = capitalizeFirstLetter(model.name);
        handleChange({ target: { name: "model", value: capitalizedModel } });
        setSuggestions([]);
    };

    const handleBlur = () => {
        setTimeout(() => {
            const filteredModels = carModels.filter(
                (model) => model.car_make_id === formData.make_id
            );
            const isValid = filteredModels.some(
                (model) =>
                    model.name.toLowerCase() === formData.model.toLowerCase()
            );

            const toastId = "invalidModel";

            if (!isValid) {
                if (!toast.isActive(toastId))
                    toast.warn(
                        "Invalid model selected. Please choose from the suggestions.",
                        { toastId }
                    );
                setFormData({ ...formData, model: "" });
            }

            setSuggestions([]);
        }, 150);
    };

    return (
        <div className="relative">
            <input
                type="text"
                name="model"
                placeholder="Select model"
                value={formData.model}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className="form-control w-full p-2  border rounded sm:pl-20 "
            />
            {suggestions.length > 0 && (
                <ul className="absolute w-full bg-white border rounded mt-1">
                    {suggestions.map((model) => (
                        <li
                            key={model.id}
                            onMouseDown={() => handleSelect(model)}
                            className="p-2 hover:bg-gray-200 cursor-pointer text-black"
                        >
                            {model.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const SearchContent = () => {
    const { carMakes, carModels } = usePage().props;
    // console.log(carMakes);

    const { url } = usePage();
    const query = new URLSearchParams(url.split("?")[1]);

    const [formData, setFormData] = useState({
        make: query.get("make") || "",
        model: query.get("model") || "",
        year_min: query.get("year_min") || "",
        year_max: query.get("year_max") || "",
        price_min: query.get("price_min") || "",
        price_max: query.get("price_max") || "",
        mileage_min: query.get("mileage_min") || "",
        mileage_max: query.get("mileage_max") || "",
        transmission: query.get("transmission") || "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        router.get(route("cars.search"), formData, {
            preserveScroll: true,
            // preserveState: true,
            onSuccess: () => {
                setErrors({});
            },
            onError: (errors) => {
                toast.error("Check the errors");
                console.log(errors);
                toast.error(errors.year);
                toast.error(errors.make);
                toast.error(errors.mileage);
                toast.error(errors.transmission);
                toast.error(errors.price);
                setErrors(errors);
            },
        });
        // setFormData([]);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="container d-flex justify-content-center align-items-center pb-6 pt-4"
                style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    width: "47rem",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                }}
            >
                <div>
                    <h1
                        className="text-center"
                        style={{ color: "#01D28E", marginBottom: "45px" }}
                    >
                        Find a Car
                    </h1>
                    <div className="model-search-content">
                        <div className="row justify-content-center">
                            <div className="col-md-4 pb-4">
                                <div className="single-model-search">
                                    <h6 className="text-black">Year</h6>
                                    <div className="model-select-icon">
                                        <YearRangeFilter
                                            formData={formData}
                                            handleChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="single-model-search pt-5">
                                    <h6 className="text-black">Mileage</h6>
                                    <div className="model-select-icon">
                                        <MileageRangeFilter
                                            formData={formData}
                                            setFormData={setFormData}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="single-model-search">
                                    <h6 className="text-black"> Make</h6>
                                    <div className="model-select-icon">
                                        <CarMakeInput
                                            formData={formData}
                                            handleChange={handleChange}
                                            setFormData={setFormData}
                                            carMakes={carMakes}
                                        />
                                    </div>
                                </div>

                                <div className="single-model-search pt-5">
                                    <h6 className="text-black">Transmission</h6>
                                    <div className="model-select-icon">
                                        <select
                                            className={`block w-full px-3 py-2.5 border border-black-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                formData.transmission === ""
                                                    ? "text-gray-400"
                                                    : "text-black"
                                            }`}
                                            defaultValue=""
                                            onChange={(e) => {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    transmission:
                                                        e.target.value,
                                                }));

                                                if (e.target.value !== "") {
                                                    e.target.classList.remove(
                                                        "text-gray-400"
                                                    );
                                                    e.target.classList.add(
                                                        "text-black"
                                                    );
                                                }
                                            }}
                                        >
                                            <option value="" disabled hidden>
                                                Transmission
                                            </option>
                                            <option value="Automatic">
                                                Automatic
                                            </option>
                                            <option value="Manual">
                                                Manual
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="single-model-search">
                                    <h6 className="text-black">Model</h6>
                                    <div className="model-select-icon">
                                        <CarModelInput
                                            formData={formData}
                                            handleChange={handleChange}
                                            carModels={carModels}
                                            setFormData={setFormData}
                                        />
                                    </div>
                                </div>

                                <div className="single-model-search pt-5">
                                    <h6 className="text-black">Price Range</h6>
                                    <PriceRangeFilter
                                        priceMin={formData.price_min}
                                        priceMax={formData.price_max}
                                        setFormData={setFormData}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-10">
                            <button
                                type="submit"
                                className="welcome-btn model-search-btn"
                                style={{
                                    color: "white",
                                    backgroundColor: "#01D28E",
                                    borderRadius: "10px",
                                    // padding: "7px",
                                    padding: "4px 20px 4px 20px",

                                    width: "10rem",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    Search
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default SearchContent;
