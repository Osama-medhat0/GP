import { usePage, router, Link } from "@inertiajs/react";
import { SidebarProvider } from "../Frontend/Dashboard/Components/SidebarContext";
import DashboardLayout from "../Frontend/Dashboard/DashboardLayout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCarsPage = () => {
    const { cars } = usePage().props;
    console.log(cars);
    const handleDelete = (carId) => {
        const confirmToast = ({ closeToast }) => (
            <div className="text-center">
                <p className="mb-2">
                    Are you sure you want to delete this car?
                </p>
                <div className="flex justify-center space-x-2">
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => {
                            router.delete(route("car.delete", carId), {
                                preserveScroll: true,
                                onError: (error) =>
                                    toast.error("Error deleting car: " + error),
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
    console.log(cars);
    return (
        <SidebarProvider>
            <DashboardLayout>
                <div className="pt-4 pl-0 flex justify-center items-start min-h-screen">
                    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-3xl">
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Listed Cars
                        </h2>
                        <div className="overflow-x-auto w-full">
                            <table className="min-w-full w-full table-auto bg-white border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-2 px-4 border text-left">
                                            Make
                                        </th>
                                        <th className="py-2 px-4 border text-left">
                                            Model
                                        </th>
                                        <th className="py-2 px-4 border text-left">
                                            Year
                                        </th>
                                        <th className="py-2 px-4 border text-left">
                                            Price
                                        </th>
                                        <th className="py-2 px-4 border text-left">
                                            Image cover
                                        </th>
                                        <th className="py-2 px-4 border text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cars && cars.length > 0 ? (
                                        cars.map((car) => (
                                            <tr
                                                key={car.id}
                                                className="border-b hover:bg-gray-50"
                                            >
                                                <td className="py-2 px-4 border">
                                                    {car.make}
                                                </td>
                                                <td className="py-2 px-4 border">
                                                    {car.model}
                                                </td>
                                                <td className="py-2 px-4 border">
                                                    {car.year}
                                                </td>
                                                <td className="py-2 px-4 border">
                                                    {parseFloat(
                                                        car.price
                                                    ).toLocaleString("en-US", {
                                                        style: "currency",
                                                        currency: "USD",
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0,
                                                    })}
                                                </td>
                                                <td className="py-2 px-4 border">
                                                    {car.image_urls &&
                                                    car.image_urls.length >
                                                        0 ? (
                                                        <img
                                                            src={
                                                                car
                                                                    .image_urls[0]
                                                            } // Show first image
                                                            alt={`${car.make} ${car.model}`}
                                                            className="w-17 h-16 object-cover rounded-md "
                                                        />
                                                    ) : (
                                                        <span>No Image</span>
                                                    )}
                                                </td>
                                                <td className="py-2 px-4 border">
                                                    <Link
                                                        href={route(
                                                            "car.edit.form",
                                                            car.id
                                                        )}
                                                        className="text-blue-600 hover:underline mr-2"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(car.id)
                                                        }
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="py-4 text-center text-gray-500"
                                            >
                                                No cars Listed
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </SidebarProvider>
    );
};

export default UserCarsPage;
