import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

import {
    Tag,
    CarFront,
    Calendar,
    DollarSign,
    Gauge,
    Fuel,
    Settings,
    MapPin,
    FileText,
    MessageCircle,
} from "lucide-react";

const Spec = ({ label, value, Icon }) => (
    <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-gray-500 ">
            {Icon && <Icon size={20} className="text-gray-400" />}
            <span>{label}</span>
        </div>
        <div className="font-semibold text-black break-words">
            {value ?? "_"}
        </div>
    </div>
);

const CarDetails = () => {
    const { car } = usePage().props;

    const {
        make,
        model,
        price,
        fuelType,
        transmission,
        mileage,
        year,
        location,
        description,
        images,
        created_at,
    } = car;
    console.log(car);

    // Decode the stringified images array
    let parsedImages = [];
    try {
        parsedImages = JSON.parse(images).map((img) => `/storage/${img}`);
    } catch (e) {
        console.error("Failed to parse car images:", e);
    }

    const [currentImage, setCurrentImage] = useState(0);

    const prevImage = () => {
        setCurrentImage(
            (currentImage - 1 + parsedImages.length) % parsedImages.length
        );
    };

    const nextImage = () => {
        setCurrentImage((currentImage + 1) % parsedImages.length);
    };

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
                {/* Left Side: Image Carousel */}
                <div className="relative w-full">
                    {parsedImages.length > 0 && (
                        <>
                            {/* Main Image */}
                            <div className="w-full h-[400px] overflow-hidden rounded-2xl">
                                <img
                                    src={parsedImages[currentImage]}
                                    alt={`Car ${currentImage + 1}`}
                                    className="w-full h-full object-cover transition duration-300"
                                />
                            </div>

                            {/* Left Arrow */}
                            <button
                                onClick={prevImage}
                                className="absolute top-1/2 left-3 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            {/* Right Arrow */}
                            <button
                                onClick={nextImage}
                                className="absolute top-1/2 right-3 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
                            >
                                <ChevronRight size={24} />
                            </button>

                            {/* Thumbnails */}
                            <div className="flex gap-2 mt-4">
                                {parsedImages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Thumb ${index + 1}`}
                                        className={`w-20 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                                            currentImage === index
                                                ? "border-blue-500 outline  outline-blue-500 scale-150"
                                                : "border-gray-300"
                                        }transition duration-200 transform`}
                                        onClick={() => setCurrentImage(index)}
                                    />
                                ))}
                            </div>
                            <div className="grid grid-cols-2  mt-20 border-2 rounded-lg p-2">
                                <div className=" font-bold">
                                    <p className="text-black text-lg">
                                        Listed by {car.user.name}
                                    </p>
                                </div>
                                <button className="text-blue-500 ">
                                    <div className="flex justify-center bg-blue-500 text-white rounded pt-2 pb-2 hover:bg-blue-600 duration-300">
                                        See profile
                                        <ChevronRight
                                            className="mt-1"
                                            size={24}
                                        />
                                    </div>
                                </button>
                                <p className="font-bold">
                                    Member since{" "}
                                    <p>{car.user.created_at.slice(0, 10)}</p>
                                </p>
                                <button className="flex bg-blue-500 rounded justify-center mt-10 pt-2 pb-2 text-white hover:bg-blue-600 duration-300">
                                    <MessageCircle className="mr-1" /> Chat
                                </button>
                            </div>
                        </>
                    )}
                </div>
                {/* Right Side: Car Details */}
                <div>
                    <h1 className="text-3xl font-bold">
                        {make} {model} ({year})
                    </h1>
                    <p className="text-xl text-green-500 font-semibold mt-2">
                        {parseFloat(price).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-6 text-sm border-t pt-6">
                        <Spec label="Make" value={make} Icon={Tag} />
                        <Spec label="Model" value={model} Icon={CarFront} />
                        <Spec label="Year" value={year} Icon={Calendar} />
                        <div>
                            <Spec
                                label="Price"
                                value={parseFloat(price).toLocaleString(
                                    "en-US",
                                    {
                                        style: "currency",
                                        currency: "USD",
                                    }
                                )}
                                Icon={DollarSign}
                            />
                        </div>
                        <Spec label="Kilometers" value={mileage} Icon={Gauge} />
                        <Spec label="Fuel" value={fuelType} Icon={Fuel} />
                        <Spec
                            label="Transmission"
                            value={transmission}
                            Icon={Settings}
                        />
                        <Spec label="Location" value={location} Icon={MapPin} />
                        <Spec
                            label="Description"
                            value={description}
                            Icon={FileText}
                        />
                    </div>
                </div>
            </div>
            <div className="text-center mt-3 mb-5">
                <Link
                    href={route("cars.page")}
                    className="active px-10  bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Back to Cars
                </Link>
            </div>
        </MainLayout>
    );
};

export default CarDetails;
