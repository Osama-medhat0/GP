import { useState } from "react";
import { SidebarProvider } from "../Frontend/Dashboard/Components/SidebarContext";
import DashboardLayout from "../Frontend/Dashboard/DashboardLayout";
import { router } from "@inertiajs/react";
import { CAlert } from "@coreui/react";

const carMakes = [
    "Toyota",
    "Tata",
    "Tesla",
    "Toyota Crown",
    "Tiguan",
    "Triumph",
    "mustang",
    "Mazda",
    "Mitsubishi",
    "Mercedes",
    "Mini",
    "Nissan",
    "Noble",
    "Opel",
    "Peugeot",
    "Porsche",
    "Proton",
    "Renault",
    "Rolls Royce",
    "Rover",
    "Saab",
    "Seat",
    "Skoda",
    "Smart",
    "Subaru",
    "Suzuki",
    "Volkswagen",
    "Volvo",
    "Vauxhall",
    "Acura",
    "Alfa Romeo",
];

const carModels = {
    Toyota: [
        "Corolla",
        "Camry",
        "Land Cruiser",
        "Fortuner",
        "Prado",
        "Vitz",
        "Premio",
        "Allion",
        "Aqua",
        "Axio",
        "Belta",
        "C-HR",
        "Hiace",
        "Hilux",
        "Noah",
        "Passo",
        "Prius",
        "Ractis",
        "Rush",
        "Vanguard",
        "Voxy",
        "Wish",
    ],
    Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
    Tata: ["Nexon", "Safari", "Harrier", "Altroz"],
    Mazda: ["CX-5", "MX-5", "Mazda3", "Mazda6"],
};

const CarMakeInput = ({ formData, handleChange, setModels, clearModel }) => {
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        handleChange(e);

        if (value) {
            const filterd = carMakes.filter((make) =>
                make.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filterd);
        } else {
            setSuggestions([]); // orginally empty array
        }
    };

    const handleSelect = (make) => {
        setModels(carModels[make] || []);
        clearModel();
        handleChange({ target: { name: "make", value: make } });
        setSuggestions([]);
    };

    return (
        <div className="relative">
            <input
                type="text"
                name="make"
                placeholder="Select make"
                value={formData.make}
                onChange={handleInputChange}
                required
                className="w-full border rounded sm:pl-20 lg:pr-80 lg:pl-2"
                style={{
                    // paddingRight: "25rem",
                    zIndex: 1000,
                    // position: "absolute",
                }}
            />
            {suggestions.length > 0 && (
                <ul className="absolute w-full bg-white border rounded mt-1">
                    {suggestions.map((make) => (
                        <li
                            key={make}
                            onClick={() => handleSelect(make)}
                            className="p-2 hover:bg-gray-200 cursor-pointer text-black"
                        >
                            {make}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const CarModelInput = ({ formData, handleChange, models }) => {
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        handleChange(e);

        if (value) {
            const filtered = models.filter((model) =>
                model.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (model) => {
        handleChange({ target: { name: "model", value: model } });
        setSuggestions([]);
    };

    return (
        <div className="relative">
            <input
                type="text"
                name="model"
                placeholder="Select model"
                value={formData.model}
                onChange={handleInputChange}
                required
                disabled={!models.length}
                className="w-full border rounded sm:pl-20 lg:pr-80 lg:pl-2"
                // style={{ paddingRight: "25rem" }}
            />
            {suggestions.length > 0 && (
                <ul className="absolute w-full bg-white border rounded mt-1">
                    {suggestions.map((model) => (
                        <li
                            key={model}
                            onClick={() => handleSelect(model)}
                            className="p-2 hover:bg-gray-200 cursor-pointer text-black"
                        >
                            {model}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const NewCarListingForm = () => {
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

    const [models, setModels] = useState([]);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, images: [...e.target.files] });
    };

    const clearModel = () => setFormData({ ...formData, model: "" });

    const handleSubmit = (e) => {
        // Simple client-side validation

        e.preventDefault();
        console.log(formData);
        router.post("/car", formData, {
            preserveScroll: true,
            onSuccess: () => {
                alert("Car listed successfully!");
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
            },
            onError: (errors) => setErrors(errors),
        });
        // setFormData([]);
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
                                setModels={setModels}
                                clearModel={clearModel}
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
                            models={models}
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

                    <div className="flex  gap-2 pt-3">
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

                    <div className="flex  gap-2 pt-3 pb-4">
                        <h6> Images</h6>
                        <input
                            type="file"
                            name="images"
                            multiple
                            accept="images/*"
                            onChange={handleImageChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className=" active w-full bg-blue-300 text-white p-2 rounded hover:bg-blue-500 transition duration-300"
                    >
                        List Car
                    </button>
                </form>
            </DashboardLayout>
        </SidebarProvider>
    );
};

export default NewCarListingForm;
