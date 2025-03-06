import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Sidebar } from "@coreui/coreui";
import { SidebarProvider } from "../Frontend/Dashboard/Components/SidebarContext";
import DashboardLayout from "../Frontend/Dashboard/DashboardLayout";

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

const CarMakeInput = ({ formData, handleChange, setModels }) => {
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
                className="w-full p-2 border rounded"
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
    console.log(models);
    return (
        <div className="relative">
            <input
                type="text"
                name="model"
                placeholder="Select model"
                value={formData.model}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                list="model-options"
            />

            <datalist id="model-options">
                {models.map((model) => (
                    <option key={model} value={model} />
                ))}
            </datalist>
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // console.log(formData);
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, images: [...e.target.files] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/cars", formData);
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
                    <h6> Make</h6>
                    <CarMakeInput
                        formData={formData}
                        handleChange={handleChange}
                        setModels={setModels}
                    />
                    <h6> Model</h6>
                    <CarModelInput
                        formData={formData}
                        handleChange={handleChange}
                        models={models}
                    />
                    <h6> Year</h6>
                    <input
                        type="number"
                        name="year"
                        placeholder="Year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <h6> Price</h6>
                    <input
                        type="number"
                        name="price"
                        placeholder="Eneter the totalt price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
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
                    <h6> Fuel</h6>
                    <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Fuel Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                    <h6> Transmission</h6>
                    <select
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Transmission</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                    </select>
                    <h6> Location</h6>
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <h6> Description</h6>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <h6> Images</h6>
                    <input
                        type="file"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <button
                        type="submit"
                        className=" active w-full bg-blue-500 text-white p-2 rounded"
                    >
                        List Car
                    </button>
                </form>
            </DashboardLayout>
        </SidebarProvider>
    );
};

export default NewCarListingForm;
