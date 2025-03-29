import { useState } from "react";
import { Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CompareSidebar = ({ selectedCars, removeCar }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    return (
        <div className="relative">
            {/* Toggle Button */}
            <button
                className=" chevron fixed mt-44 bg-green-400 text-white p-2 rounded-r-lg shadow-md z-50"
                onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            >
                {isSidebarVisible ? (
                    <ChevronRight size={24} />
                ) : (
                    <ChevronLeft size={24} />
                )}
            </button>

            {/* Sidebar */}
            <div
                className={`compare-sidebar  ${
                    isSidebarVisible ? "" : "w-0 overflow-hidden z-0"
                }`}
            >
                {isSidebarVisible && (
                    <>
                        <div className="sidebar-header">
                            <span className="text-black text-sm">
                                {selectedCars.length} ITEMS IN COMPARE
                            </span>
                        </div>

                        <div className="car-list">
                            {selectedCars.map((car) => (
                                <div key={car.id} className="car-item">
                                    <button
                                        className="text-white text-[11px] cursor-pointer bg-red-500 mb-12 rounded-full transition-transform duration-300 hover:scale-125 px-1"
                                        onClick={() => removeCar(car.id)}
                                    >
                                        X
                                    </button>
                                    <Link href={route("car.detail", car.id)}>
                                        <img
                                            className="img p-8 rounded-md"
                                            style={{
                                                backgroundImage: `url('${car.images[0]}')`,
                                            }}
                                            alt={`${car.make} ${car.model}`}
                                        />
                                    </Link>
                                    <div>
                                        <Link
                                            href={route("car.detail", car.id)}
                                        >
                                            <p>
                                                <div className="text-black">
                                                    {car.make}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {car.model} {car.year}
                                                </div>
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {selectedCars.length > 1 && (
                            <Link
                                href={route("car.compare", {
                                    cars: selectedCars.map((c) => c.id),
                                })}
                                className="compare-btn active w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                            >
                                Compare
                            </Link>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default CompareSidebar;
