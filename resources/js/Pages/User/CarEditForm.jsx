import { router, useForm } from "@inertiajs/react";
import { SidebarProvider } from "../Frontend/Dashboard/Components/SidebarContext";
import DashboardLayout from "../Frontend/Dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import CarImageUploader from "./CarImageUploader";
import { CAlert } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCamera } from "@coreui/icons";
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
                alert(
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
                alert(
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
export default function CarEditForm({ car, carMakes, carModels }) {
    const handleImageChange = (e) => {
        const newImages = Array.from(e.target.files);
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...newImages],
        }));
    };

    const removeImage = (index, type) => {
        setFormData((prev) => ({
            ...prev,
            deletedImages:
                type === "existing"
                    ? [
                          ...(prev.deletedImages || []), // [] avoids errors if it's undefined
                          prev.existingImages[index],
                      ]
                    : prev.deletedImages,
            existingImages:
                type === "existing"
                    ? prev.existingImages.filter((_, i) => i !== index) // keeps all images except the one at index
                    : prev.existingImages,
            images:
                type === "new"
                    ? prev.images.filter((_, i) => i !== index)
                    : prev.images,
        }));
    };

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
        existingImages: [],
        deletedImages: [],
    });

    useEffect(() => {
        const defaultCar = car[0];
        setFormData({
            make: defaultCar.make || "",
            model: defaultCar.model || "",
            year: defaultCar.year || "",
            price: defaultCar.price || "",
            mileage: defaultCar.mileage || "",
            fuelType: defaultCar.fuelType || "",
            transmission: defaultCar.transmission || "",
            location: defaultCar.location || "",
            description: defaultCar.description || "",
            images: [], // new uploads
            existingImages: defaultCar.image_urls || [], //existing image URLs
        });
        console.log(defaultCar.image_urls);
    }, [car]);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            formData.images.length === 0 &&
            formData.existingImages.length === 0
        ) {
            toast.warn("At least one image is required.");
            return;
        }

        console.log("Submitting form with data:", formData);

        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key === "images") {
                formData.images.forEach((image) => {
                    if (image instanceof File) {
                        data.append("images[]", image);
                    }
                });
            } else if (key === "existingImages") {
                data.append(
                    "existingImages",
                    JSON.stringify(formData.existingImages)
                );
            } else if (key === "deletedImages") {
                data.append(
                    "deletedImages",
                    JSON.stringify(formData.deletedImages)
                );
            } else {
                data.append(key, formData[key]);
            }
        });

        router.post(route("car.update", car[0].id), data, {
            preserveScroll: true,
            onSuccess: () => {
                setErrors({});
            },

            onError: (errors) => {
                toast.error("Failed to update car. Please check the errors.");
                setErrors(errors);
            },
        });
    };

    return (
        <SidebarProvider>
            {/* understand foerm */}
            <DashboardLayout>
                <div className="text-center text-3xl font-bold mb-6 pt-9 ">
                    Update Your Car List
                </div>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
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
                                value={formData.make}
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

                    <div className="flex  gap-5 pt-3">
                        <h6> Price</h6>
                        <input
                            type="number"
                            name="price"
                            placeholder="Enter the total price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full border rounded"
                        />
                    </div>
                    {errors.price && (
                        <CAlert color="danger">{errors.price}</CAlert>
                    )}

                    <div className="flex gap-2 pt-3">
                        <h6> Kilometers</h6>
                        <input
                            type="number"
                            name="mileage"
                            placeholder="Ex:20,000"
                            value={formData.mileage}
                            onChange={handleChange}
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

                    <div className="image-uploader ">
                        <label htmlFor="file-input" className="add-image">
                            +
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                            disabled={
                                formData.images.length +
                                    formData.existingImages.length ===
                                4
                            }
                        />

                        {formData.existingImages.map((imageUrl, index) => (
                            <div
                                key={`existing-${index}`}
                                className={`image-preview ${
                                    index === 0 ? "cover" : ""
                                }`}
                            >
                                <img src={imageUrl} alt="Existing Car" />
                                <button
                                    type="button"
                                    className="remove-btn pb-4"
                                    onClick={() =>
                                        removeImage(index, "existing")
                                    }
                                >
                                    &times;
                                </button>
                                {index === 0 && (
                                    <span className="cover-tag">COVER</span>
                                )}
                            </div>
                        ))}

                        {formData.images.map((image, index) => (
                            <div
                                key={`new-${index}`}
                                className={`image-preview ${
                                    index === 0 ? "cover" : ""
                                }`}
                            >
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="New Upload"
                                />
                                <button
                                    type="button"
                                    className="remove-btn pb-4"
                                    onClick={() => removeImage(index, "new")}
                                >
                                    &times;
                                </button>
                                {index === 0 &&
                                    formData.existingImages.length === 0 && (
                                        <span className="cover-tag">COVER</span>
                                    )}
                            </div>
                        ))}

                        {Array.from({
                            length:
                                4 -
                                formData.images.length -
                                formData.existingImages.length,
                        }).map((_, index) => (
                            <label
                                key={`empty-${index}`}
                                className="empty-slot cursor-pointer"
                            >
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <CIcon
                                    icon={cilCamera}
                                    style={{
                                        width: "22px",
                                        marginLeft: "10px",
                                    }}
                                />
                                <div>+</div>
                            </label>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className=" active w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-500 transition duration-300"
                    >
                        Update Car List
                    </button>
                </form>
            </DashboardLayout>
        </SidebarProvider>
    );
}
