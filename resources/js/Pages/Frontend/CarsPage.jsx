import SearchContent from "./Components/SearchContent";
import MainLayout from "@/Layouts/MainLayout";
import { Link, usePage, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import CompareSidebar from "../User/CompareSidebar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const CarsPage = () => {
    const { auth, cars } = usePage().props;
    const user = auth.user;

    const [isSidebarVisible, setIsSidebarVisible] = useState(() => {
        const storedCars =
            JSON.parse(localStorage.getItem("selectedCars")) || [];
        return storedCars.length > 0; // Set to true if there are saved cars
    });

    const toggleCompareSidebar = () => {
        setIsSidebarVisible((prev) => !prev);
    };

    const [selectedCars, setSelectedCars] = useState(() => {
        const saved = JSON.parse(localStorage.getItem("selectedCars")) || [];
        return saved.map((car) => ({
            ...car,
            images:
                typeof car.images === "string"
                    ? JSON.parse(car.images)
                    : car.images,
        }));
    });

    // Handle selecting/unselecting cars
    const handleSelectCar = (car) => {
        setSelectedCars((prev) => {
            let updatedCars;

            // Normalize image field if needed
            const fixedCar = {
                ...car,
                images:
                    typeof car.images === "string"
                        ? JSON.parse(car.images)
                        : car.images,
            };

            if (prev.some((c) => c.id === car.id)) {
                updatedCars = prev.filter((c) => c.id !== car.id);
            } else {
                updatedCars = prev.length < 4 ? [...prev, fixedCar] : prev;
                setIsSidebarVisible(true);
            }

            localStorage.setItem("selectedCars", JSON.stringify(updatedCars));
            return updatedCars;
        });
    };

    // Remove car from sidebar
    const removeCar = (carId) => {
        setSelectedCars((prev) => {
            const updatedCars = prev.filter((car) => car.id !== carId);
            localStorage.setItem("selectedCars", JSON.stringify(updatedCars));
            return updatedCars;
        });
    };

    return (
        <>
            <MainLayout>
                <CompareSidebar
                    selectedCars={selectedCars}
                    removeCar={removeCar}
                    isSidebarVisible={isSidebarVisible} // Pass as a prop
                    toggleSidebar={toggleCompareSidebar} // Pass toggle function
                />

                <section
                    className="hero-wrap hero-wrap-2 js-fullheight"
                    style={{ backgroundImage: "url('assets/images/mr2.jpg')" }}
                    data-stellar-background-ratio="0.5"
                >
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
                            <div className="col-md-9 ftco-animate pb-5">
                                <p className="breadcrumbs">
                                    <span className="mr-2">
                                        <Link href={route("home")}>
                                            Home{" "}
                                            <i className="ion-ios-arrow-forward"></i>
                                        </Link>
                                    </span>
                                    <span>
                                        Cars{" "}
                                        <i className="ion-ios-arrow-forward"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-section ftco-no-pt bg-light">
                    <div className="container">
                        <div className="row no-gutters pt-14">
                            <SearchContent />
                        </div>
                    </div>
                </section>
                <section className="ftco-section bg-light">
                    <div className="container">
                        <div className="row">
                            {cars?.data?.length > 0 ? (
                                cars.data.map((car) => (
                                    <div key={car.id} className="col-md-4">
                                        <div className="car-wrap rounded ftco-animate">
                                            <Swiper
                                                modules={[
                                                    Navigation,
                                                    Pagination,
                                                    Scrollbar,
                                                    A11y,
                                                ]}
                                                spaceBetween={10}
                                                slidesPerView={1}
                                                navigation
                                                pagination={{ clickable: true }}
                                                scrollbar={{ draggable: true }}
                                            >
                                                {(() => {
                                                    if (
                                                        typeof car.images ===
                                                        "string"
                                                    ) {
                                                        const parsedImages =
                                                            JSON.parse(
                                                                car.images
                                                            );
                                                        // console.log(
                                                        //     parsedImages
                                                        // );

                                                        return parsedImages.length >
                                                            1 ? (
                                                            parsedImages.map(
                                                                (
                                                                    image,
                                                                    index
                                                                ) => (
                                                                    <SwiperSlide
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <img
                                                                            src={`/${image.replace(
                                                                                /^\/+|^car\//,
                                                                                ""
                                                                            )}`} // remove leading slashes and "car/"
                                                                            alt={`Car ${car.make} ${car.model}`}
                                                                            className="w-100 rounded"
                                                                            style={{
                                                                                height: "250px",
                                                                                objectFit:
                                                                                    "cover",
                                                                            }}
                                                                        />
                                                                        {/* {console.log(
                                                                            `/${image.replace(
                                                                                /^\/+|^car\//,
                                                                                ""
                                                                            )}`
                                                                        )} */}
                                                                    </SwiperSlide>
                                                                )
                                                            )
                                                        ) : (
                                                            <>
                                                                <img
                                                                    src={`http://localhost:8000/storage/car/${parsedImages[0].replace(
                                                                        /^\/+|^car\//,
                                                                        ""
                                                                    )}`}
                                                                    alt={`Car ${car.make} ${car.model}`}
                                                                    className="w-100 rounded"
                                                                    style={{
                                                                        height: "250px",
                                                                        objectFit:
                                                                            "cover",
                                                                    }}
                                                                />
                                                                {/* {console.log(
                                                                    `/${parsedImages[0].replace(
                                                                        /^\/+|^car\//,
                                                                        ""
                                                                    )}`
                                                                )} */}
                                                            </>
                                                        );
                                                    } else {
                                                        {
                                                            return car.images.map(
                                                                (
                                                                    image,
                                                                    index
                                                                ) => (
                                                                    <SwiperSlide
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <Link
                                                                            href={route(
                                                                                "car.detail",
                                                                                car.id
                                                                            )}
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    image
                                                                                }
                                                                                alt={`Car ${car.make} ${car.model}`}
                                                                                className="w-100 rounded"
                                                                                style={{
                                                                                    height: "250px",
                                                                                    objectFit:
                                                                                        "cover",
                                                                                }}
                                                                            />
                                                                        </Link>
                                                                    </SwiperSlide>
                                                                )
                                                            );
                                                        }
                                                    }
                                                })()}
                                            </Swiper>

                                            <div className="text">
                                                <h2 className="mb-0">
                                                    <Link
                                                        href={route(
                                                            "car.detail",
                                                            car.id
                                                        )}
                                                    >
                                                        {car.make} {car.model}
                                                    </Link>
                                                </h2>
                                                <div className="d-flex mb-3">
                                                    <span className="">
                                                        {car.year}
                                                    </span>
                                                    <p className="price ml-auto ">
                                                        Price:{" "}
                                                        {parseFloat(
                                                            car.price
                                                        ).toLocaleString(
                                                            "en-US",
                                                            {
                                                                style: "currency",
                                                                currency: "USD",
                                                            }
                                                        )}
                                                    </p>
                                                </div>
                                                <p className="d-flex mb-0 d-block">
                                                    {user &&
                                                    car.user_id === user.id ? (
                                                        <Link
                                                            href={route(
                                                                "live.chat",
                                                                {
                                                                    user_id:
                                                                        car.user_id,
                                                                }
                                                            )}
                                                            className={`btn btn-primary py-2 mr-1 ${
                                                                car.user_id ===
                                                                user.id
                                                                    ? "disabled"
                                                                    : ""
                                                            }`}
                                                            onClick={(e) => {
                                                                if (
                                                                    car.user_id ===
                                                                    user.id
                                                                ) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        >
                                                            Your Listing
                                                        </Link>
                                                    ) : (
                                                        <Link
                                                            href={route(
                                                                "live.chat",
                                                                {
                                                                    user_id:
                                                                        car.user_id,
                                                                    car: car.id,
                                                                }
                                                            )}
                                                            className="btn btn-primary py-2 mr-1"
                                                        >
                                                            Contact Owner
                                                        </Link>
                                                    )}
                                                    <Link
                                                        href={route(
                                                            "car.detail",
                                                            {
                                                                id: car.id,
                                                            }
                                                        )}
                                                        className="btn btn-secondary py-2 ml-1"
                                                    >
                                                        Details
                                                    </Link>
                                                </p>

                                                <button
                                                    onClick={() =>
                                                        handleSelectCar(car)
                                                    }
                                                    className={`btn ${
                                                        selectedCars.some(
                                                            (c) =>
                                                                c.id === car.id
                                                        )
                                                            ? "btn-danger"
                                                            : "btn-outline-primary"
                                                    } mt-2`}
                                                    title={
                                                        !selectedCars.some(
                                                            (c) =>
                                                                c.id === car.id
                                                        )
                                                            ? "Add up to 4 cars"
                                                            : ""
                                                    }
                                                >
                                                    {selectedCars.some(
                                                        (c) => c.id === car.id
                                                    )
                                                        ? "Remove from Compare"
                                                        : "Add to Compare"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No cars available</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Pagination */}
                <div
                    className="flex justify-center pb-20"
                    style={{ backgroundColor: "#f8f9fa" }}
                >
                    {cars?.links?.map((link) =>
                        link.url ? (
                            <Link
                                key={link.label}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`p-1 px-3 mx-3 hover:bg-blue-200 transition duration-300 rounded ${
                                    link.active
                                        ? "text-blue-500 font-bold w-xs"
                                        : " text-black"
                                }`}
                            />
                        ) : (
                            <span
                                key={link.label}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className="px-2 pt-1 text-slate-300"
                            ></span>
                        )
                    )}
                </div>
            </MainLayout>
        </>
    );
};

export default CarsPage;
