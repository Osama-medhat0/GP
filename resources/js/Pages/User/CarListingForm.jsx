import { useEffect, useState } from "react";
import { SidebarProvider } from "../Frontend/Dashboard/Components/SidebarContext";
import DashboardLayout from "../Frontend/Dashboard/DashboardLayout";
import { router, usePage } from "@inertiajs/react";
import { CAlert } from "@coreui/react";
import CarImageUploader from "./CarImageUploader";
import { toast } from "react-toastify";

const CarMakeInput = ({ formData, carMakes, setFormData, handleChange }) => {
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
            const isValid = carMakes.some(
                (make) =>
                    make.name.toLowerCase() === formData.make.toLowerCase()
            );

            if (!isValid) {
                toast.warn(
                    "Invalid make selected. Please choose from the suggestions."
                );

                setFormData({ ...formData, make: "" });
            }

            setSuggestions([]); // Clear suggestions on blur
        }, 150);
    };

    return (
        <div className="relative">
            <input
                type="text"
                name="make"
                placeholder="Select make"
                value={formData.make}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className="w-full border rounded sm:pl-20 lg:pr-80 lg:pl-2"
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

            if (!isValid) {
                toast.warn(
                    "Invalid model selected. Please choose from the suggestions."
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
                className="w-full border rounded sm:pl-20 lg:pr-80 lg:pl-2"
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

const NewCarListingForm = () => {
    const { carMakes, carModels, predicted_price } = usePage().props;
    const [overpricedConfirmed, setOverpricedConfirmed] = useState(false);
    const [hasListed, setHasListed] = useState(false);
    const [errors, setErrors] = useState({});

    // console.log(carMakes);
    // console.log(carModels);
    const [formData, setFormData] = useState({
        make: "",
        model: "",
        year: "",
        price: "",
        mileage: "",
        fuelType: "",
        transmission: "",
        location: "",
        description: "",
        images: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e, overrideOptions = {}) => {
        if (e) e.preventDefault();

        const payload = {
            ...formData,
            ...overrideOptions,
            confirmed_overpriced: overpricedConfirmed,
            price: formData.price.replace(/,/g, ""),
            mileage: formData.mileage.replace(/,/g, ""),
        };

        if (payload.images?.length === 0) {
            toast.warn("Image is required");
            return;
        }

        router.post(route("car.store"), payload, {
            preserveScroll: true,
            onSuccess: (page) => {
                const priceStatus = page.props?.flash?.price_status || "normal";

                if (priceStatus === "overpriced" && !overpricedConfirmed) {
                    setOverpricedConfirmed(true);
                    setHasListed(true); // Show the suggested price button
                    // toast.warning(page.props.flash.message);
                    return; // Don't reset form yet
                }

                // toast.success(page.props.flash.message || "Car listed.");

                setFormData({
                    make: "",
                    model: "",
                    year: "",
                    price: "",
                    mileage: "",
                    fuelType: "",
                    transmission: "",
                    location: "",
                    description: "",
                    images: [],
                });

                setErrors({});
                setOverpricedConfirmed(false); // Reset confirmation flag
                setHasListed(false);
            },
            onError: (errors) => {
                Object.entries(errors)
                    .filter(([key]) => key.startsWith("images"))
                    .forEach(([key, errMsg]) => toast.error(errMsg));
                setErrors(errors);
            },
        });
    };
    const handlePriceChange = (e) => {
        let value = e.target.value;

        // Remove anything except digits (so user can't type letters or commas)
        value = value.replace(/\D/g, "");

        // Format with commas
        const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        setFormData((prev) => ({
            ...prev,
            price: formattedValue,
        }));
    };
    const handleKmChange = (e) => {
        let value = e.target.value;

        // Remove anything except digits (so user can't type letters or commas)
        value = value.replace(/\D/g, "");

        // Format with commas
        const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        setFormData((prev) => ({
            ...prev,
            mileage: formattedValue,
        }));
    };

    return (
        <SidebarProvider>
            {/* understand foerm */}
            <DashboardLayout>
                <div className="text-center text-3xl font-bold mb-6 pt-9 ">
                    Sell Your Car
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-xl shadow-lg space-y-4 ml-10"
                >
                    <div className="flex  gap-5">
                        <h6>Make</h6>
                        <div style={{ position: "relative", zIndex: 1 }}>
                            <CarMakeInput
                                formData={formData}
                                handleChange={handleChange}
                                setFormData={setFormData}
                                carMakes={carMakes}
                            />
                        </div>
                    </div>
                    {errors.make && (
                        <CAlert color="danger">{errors.make}</CAlert>
                    )}

                    <div className="flex  gap-4 pt-3">
                        <h6 className="pr-3"> Model</h6>
                        <CarModelInput
                            formData={formData}
                            handleChange={handleChange}
                            carModels={carModels}
                            setFormData={setFormData}
                        />
                    </div>
                    {errors.model && (
                        <CAlert color="danger">{errors.model}</CAlert>
                    )}
                    <div className="flex  gap-5 pt-3">
                        <h6 className="pr-1 pt-1"> Year</h6>
                        <input
                            type="number"
                            name="year"
                            placeholder="Enter year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                            className="w-full p-2  border rounded sm:pl-20 "
                        />
                    </div>
                    {errors.year && (
                        <CAlert color="danger">{errors.year}</CAlert>
                    )}

                    <div className="flex gap-2 pt-3">
                        <h6> Kilometers</h6>
                        <input
                            type="text"
                            name="mileage"
                            placeholder="Ex:20,000"
                            value={formData.mileage}
                            onChange={handleKmChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    {errors.mileage && (
                        <CAlert color="danger">{errors.mileage}</CAlert>
                    )}

                    <div className="flex  gap-2 pt-3">
                        <h6> Fuel</h6>
                        <select
                            name="fuelType"
                            value={formData.fuelType}
                            placeholder="Select Fuel Type"
                            onChange={handleChange}
                            required
                            className="w-full p-2 ml-11 border rounded"
                        >
                            <option value="" disabled>
                                Select Fuel Type
                            </option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                    {errors.fuelType && (
                        <CAlert color="danger">{errors.fuelType}</CAlert>
                    )}
                    <h6>Transimission</h6>
                    <div className="w-full p-2 rounded flex justify-between gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                handleChange({
                                    target: {
                                        name: "transmission",
                                        value: "Automatic",
                                    },
                                })
                            }
                            className={`w-1/2 px-4 py-2 rounded transition ${
                                formData.transmission === "Automatic"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 hover:bg-blue-300"
                            }`}
                        >
                            Automatic
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                handleChange({
                                    target: {
                                        name: "transmission",
                                        value: "Manual",
                                    },
                                })
                            }
                            className={`w-1/2 px-4 py-2 rounded transition duration-300 ${
                                formData.transmission === "Manual"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 hover:bg-blue-300"
                            }`}
                        >
                            Manual
                        </button>
                    </div>
                    {errors.transmission && (
                        <CAlert color="danger">{errors.transmission}</CAlert>
                    )}
                    <div className="flex  gap-5 pt-3">
                        <h6> Price</h6>
                        <input
                            type="text"
                            name="price"
                            placeholder="Enter the total price"
                            value={formData.price}
                            onChange={handlePriceChange}
                            required
                            className="w-full border rounded"
                        />
                    </div>
                    {errors.price && (
                        <CAlert color="danger">{errors.price}</CAlert>
                    )}

                    <div className="flex  gap-2 pt-3">
                        <h6 className="pr-3"> Location</h6>
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    {errors.location && (
                        <CAlert color="danger">{errors.location}</CAlert>
                    )}

                    <div className="flex  gap-2 pt-3 pb-1">
                        <h6> Description</h6>
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    {errors.description && (
                        <CAlert color="danger">{errors.description}</CAlert>
                    )}

                    {/* <div className="flex  gap-2 pt-3 pb-4">
                        <h6> Images</h6>
                        <input
                            type="file"
                            name="images"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 border rounded"
                            style={{ display: "none" }}
                            // required
                        />
                    </div> */}
                    <h6> Images</h6>
                    <CarImageUploader
                        images={formData.images}
                        setImages={(newImages) =>
                            setFormData({ ...formData, images: newImages })
                        }
                    />
                    <button
                        type="submit"
                        className=" active w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-500 transition duration-300"
                        onClick={(e) => setHasListed(true)}
                    >
                        List Car
                    </button>
                    {predicted_price && hasListed && (
                        <button
                            type="button"
                            className="bg-green-400 text-black text-sm font-medium px-4 py-2 rounded-md hover:bg-green-500 transition duration-200 ml-44"
                            onClick={(e) => {
                                setHasListed(false);
                                handleSubmit(e, {
                                    price: predicted_price,
                                    use_ai_price: "true",
                                });
                            }}
                        >
                            Use Suggested Price{" "}
                            {parseFloat(predicted_price).toLocaleString(
                                "en-US",
                                {
                                    style: "currency",
                                    currency: "USD",
                                }
                            )}
                        </button>
                    )}
                </form>
            </DashboardLayout>
        </SidebarProvider>
    );
};

export default NewCarListingForm;
