import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import DashboardLayout from "../Frontend/Dashboard/DashboardLayout";
import { SidebarProvider } from "../Frontend/Dashboard/Components/SidebarContext";

const CarManager = ({ makes = [], models = [] }) => {
    const [newMake, setNewMake] = useState("");
    const [newModel, setNewModel] = useState("");
    const [selectedMake, setSelectedMake] = useState("");
    const [errors, setErrors] = useState({});

    const handleAddMake = () => {
        if (!newMake.trim()) {
            setErrors({ newMake: "Make name is required." });
            return;
        }
        router.post(
            route("manager.storeMake"),
            { name: newMake },
            {
                onSuccess: () => {
                    alert("Car make added successfully!");
                    setNewMake("");
                    setErrors({});
                },
                onError: (errors) => {
                    // if (errors.name) {
                    //     alert(errors.name); // This will show "The name has already been taken."
                    // }
                    setErrors(errors);
                },
            }
        );
    };

    const handleAddModel = () => {
        const newErrors = {};
        if (!newModel.trim()) newErrors.newModel = "Model name is required.";
        if (!selectedMake) newErrors.selectedMake = "Please select a make.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        router.post(
            route("manager.storeModel"),
            { name: newModel, car_make_id: selectedMake },
            {
                onSuccess: () => {
                    alert("Car model add successfully");
                    setNewModel("");
                    setSelectedMake("");
                    setErrors({});
                },
                onError: (errors) => setErrors(errors),
            }
        );
    };

    const handleDeleteMake = (id) => {
        if (confirm("Are you sure you want to delete this make?")) {
            router.delete(`/admin/manager/make/${id}`, {
                onSuccess: () => {
                    setErrors({});
                },
            });
        }
    };

    const handleDeleteModel = (id) => {
        if (confirm("Are you sure you want to delete this model?")) {
            router.delete(`/admin/manager/model/${id}`, {
                onSuccess: () => setErrors({}),
            });
        }
    };

    return (
        <SidebarProvider>
            <DashboardLayout>
                <div className="mt-6 pt-4 max-w-2xl mx-auto p-6 bg-gray-100 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Car Manager
                    </h2>

                    {/* Add Make Section */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="New Make"
                            value={newMake}
                            required
                            onChange={(e) => setNewMake(e.target.value)}
                            className="border p-2 rounded w-full mb-2"
                        />
                        {errors.newMake && (
                            <p className="text-red-500 text-sm">
                                {errors.newMake}
                            </p>
                        )}
                        <button
                            onClick={handleAddMake}
                            className="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-500 transition duration-300"
                        >
                            Add Make
                        </button>
                    </div>

                    {/* Add Model Section */}
                    <div className="mb-6">
                        <select
                            required
                            value={selectedMake}
                            onChange={(e) => setSelectedMake(e.target.value)}
                            className="border p-2 rounded w-full mb-2"
                        >
                            <option value="" disabled>
                                Select Make
                            </option>
                            {makes.map((make) => (
                                <option key={make.id} value={make.id}>
                                    {make.name}
                                </option>
                            ))}
                        </select>
                        {errors.selectedMake && (
                            <p className="text-red-500 text-sm">
                                {errors.selectedMake}
                            </p>
                        )}
                        <input
                            type="text"
                            placeholder="New Model"
                            value={newModel}
                            onChange={(e) => setNewModel(e.target.value)}
                            className="border p-2 rounded w-full mb-2"
                        />
                        {errors.newModel && (
                            <p className="text-red-500 text-sm">
                                {errors.newModel}
                            </p>
                        )}
                        <button
                            onClick={handleAddModel}
                            className="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-500 transition duration-300"
                        >
                            Add Model
                        </button>
                    </div>

                    {/* Existing Makes List */}
                    <h3 className="text-lg font-semibold mt-9 mb-3">
                        Existing Makes
                    </h3>
                    <ul className="mb-4">
                        {makes.length > 0 ? (
                            makes.map((make) => (
                                <li
                                    key={make.id}
                                    className="flex justify-between p-2 border-b"
                                >
                                    {make.name}
                                    <button
                                        onClick={() =>
                                            handleDeleteMake(make.id)
                                        }
                                        className="text-red-500 hover:bg-red-200 transition duration-300 rounded p-1"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500">No makes available.</p>
                        )}
                    </ul>

                    {/* Existing Models List */}
                    <h3 className="text-lg font-semibold mt-9 mb-3">
                        Existing Models
                    </h3>
                    <ul>
                        {console.log(models)}
                        {models.length > 0 ? (
                            models.map((model) => (
                                <li
                                    key={model.id}
                                    className="flex justify-between p-2 border-b"
                                >
                                    {model.name} ({model.make.name})
                                    <button
                                        onClick={() =>
                                            handleDeleteModel(model.id)
                                        }
                                        className="text-red-500 hover:bg-red-200 transition duration-300 rounded p-1"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500">
                                No models available.
                            </p>
                        )}
                    </ul>
                </div>
            </DashboardLayout>
        </SidebarProvider>
    );
};

export default CarManager;
