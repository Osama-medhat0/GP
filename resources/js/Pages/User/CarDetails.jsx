import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
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
} from "lucide-react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

const Spec = ({ label, value, Icon }) => (
    <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-gray-500">
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
    } = car;
    console.log(car);
    const user = usePage().props.auth.user;
    console.log(user);
    const [currentImage, setCurrentImage] = useState(0);
    const swiperRef = useRef(null);
    let parsedImages = JSON.parse(images).map((img) => `/storage/${img}`);

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Image Carousel */}
                <div className="relative w-full">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        className="rounded-2xl"
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                    >
                        {parsedImages.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image}
                                    alt={`Car ${make} ${model}`}
                                    className="w-full rounded object-cover h-64"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Thumbnails */}
                    <div className="flex gap-2 mt-4">
                        {parsedImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumb ${index + 1}`}
                                className={`w-20 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                                    currentImage === index
                                        ? "border-blue-500 scale-110"
                                        : "border-gray-300"
                                } transition duration-200 transform`}
                                onClick={() => {
                                    setCurrentImage(index);
                                    swiperRef.current?.slideTo(index);
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Car & Seller Details */}
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
                        <Spec
                            label="Price"
                            value={parseFloat(price).toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                            Icon={DollarSign}
                        />
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

                    {/* Seller Details */}
                    <div className="grid grid-cols-2  mt-10 border-2 rounded-lg p-2">
                        <div className=" font-bold">
                            <p className="text-black text-lg">
                                Listed by {car.user.name}
                            </p>
                        </div>
                        <button className="text-blue-500 ">
                            <div className="flex justify-center bg-blue-500 text-white rounded pt-2 pb-2 hover:bg-blue-600 duration-300">
                                See profile
                                <ChevronRight className="mt-1" size={24} />
                            </div>
                        </button>
                        <p className="font-bold">
                            Member since{" "}
                            <p>{car.user.created_at.slice(0, 10)}</p>
                        </p>
                        {car.user_id === user.id ? (
                            <p className="font-bold">Your listing</p>
                        ) : (
                            <Link
                                href={route("live.chat", {
                                    user_id: car.user_id,
                                })}
                                className="flex bg-blue-500 rounded justify-center mt-10 pt-2 pb-2 text-white hover:bg-blue-600 duration-300"
                            >
                                <MessageCircle className="mr-1" /> Chat
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="text-center  my-9">
                <Link
                    href={route("cars.page")}
                    className="px-10  bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Back to Cars
                </Link>
            </div>
        </MainLayout>
    );
};

export default CarDetails;
