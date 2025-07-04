import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import DashboardLayout from "../Frontend/Dashboard/DashboardLayout";
import { SidebarProvider } from "../Frontend/Dashboard/Components/SidebarContext";
import { toast } from "react-toastify";

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
                    setNewMake("");
                    setErrors({});
                },
                onError: (errors) => {
                    toast.error(`${errors.name}`);
                    setErrors({ newMake: errors.name });
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
            { name: newModel, make_name: selectedMake },
            {
                onSuccess: () => {
                    setNewModel("");
                    setSelectedMake("");
                    setErrors({});
                },
                onError: (errors) => {
                    setErrors({
                        newModel: errors.name,
                        selectedMake: errors.make_name,
                    });
                    toast.error(
                        `Error: ${errors.name || ""} ${errors.make_name || ""}`
                    );
                },
            }
        );
    };
    const handleDeleteMake = (id) => {
        const confirmToast = ({ closeToast }) => (
            <div className="text-center">
                <p className="mb-2">
                    Are you sure you want to delete this make?
                </p>
                <div className="flex justify-center space-x-2">
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => {
                            router.delete(route("manager.deleteMake", id), {
                                preserveScroll: true,
                                onError: (error) =>
                                    toast.error(`${errors.name}`),
                            });
                            closeToast(); // Close the toast after clicking
                        }}
                    >
                        Yes, Delete
                    </button>
                    <button
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                        onClick={closeToast}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );

        toast.warn(confirmToast, {
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            closeButton: false,
        });
    };

    const handleDeleteModel = (id) => {
        const confirmToast = ({ closeToast }) => (
            <div className="text-center">
                <p className="mb-2">
                    Are you sure you want to delete this model?{" "}
                </p>
                <div className="flex justify-center space-x-2">
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => {
                            router.delete(route("manager.deleteModel", id), {
                                preserveScroll: true,
                                onError: (error) =>
                                    toast.error(`${errors.name}`),
                            });
                            closeToast(); // Close the toast after clicking
                        }}
                    >
                        Yes, Delete
                    </button>
                    <button
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                        onClick={closeToast}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );

        toast.warn(confirmToast, {
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            closeButton: false,
        });
    };
    return (
        <SidebarProvider>
            <DashboardLayout>
                {/* {console.log(makes)} */}
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
                        <input
                            type="text"
                            placeholder="Make Name"
                            value={selectedMake}
                            onChange={(e) => setSelectedMake(e.target.value)}
                            className="border p-2 rounded w-full mb-2"
                        />

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
                        {makes.data.length > 0 ? (
                            makes.data.map((make) => (
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
                    <div className="flex justify-end ">
                        {makes.links.map((link) =>
                            link.url ? (
                                <Link
                                    key={link.label}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={`p-1 mx-1 hover:bg-blue-200 transition duration-300 rounded ${
                                        link.active
                                            ? "text-blue-500  font-bold w-xs"
                                            : " text-black"
                                    }`}
                                />
                            ) : (
                                <span
                                    key={link.label}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className=" px-2 pt-1 text-slate-300"
                                ></span>
                            )
                        )}
                    </div>
                    {/* Existing Models List */}
                    <h3 className="text-lg font-semibold mt-9 mb-3">
                        Existing Models
                    </h3>
                    <ul>
                        {/* {console.log(models)} */}
                        {models.data.length > 0 ? (
                            models.data.map((model) => (
                                <li
                                    key={model.id}
                                    className="flex justify-between p-2 border-b"
                                >
                                    {model.name} ({model.make.name})
                                    <button
                                        onClick={() =>
                                            handleDeleteModel(model.id)
                                        }
                                        className="text-red-500 hover:bg-red-200 transition duration-300 rounded p-1 no-underline"
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
                    {/* {console.log(models)} */}
                    <div className="flex justify-end pt-3 ">
                        {models.links.map((link) =>
                            link.url ? (
                                <Link
                                    key={link.label}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={`p-1 mx-1 hover:bg-blue-200 transition duration-300 rounded ${
                                        link.active
                                            ? "text-blue-500  font-bold w-xs"
                                            : " text-black"
                                    }`}
                                />
                            ) : (
                                <span
                                    key={link.label}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className=" px-2 pt-1 text-slate-300"
                                ></span>
                            )
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </SidebarProvider>
    );
};

export default CarManager;
