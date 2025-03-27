import MainLayout from "@/Layouts/MainLayout";
import { Link, usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useEffect } from "react";

const CarsPage = () => {
    const { cars } = usePage().props;
    // console.log(cars);

    useEffect(() => {
        router.reload({ only: ["cars"] }); // forces Inertia to fetch fresh car data instead of using a cached version.
    }, []);

    return (
        <>
            <MainLayout>
                <section
                    className="hero-wrap hero-wrap-2 js-fullheight"
                    style={{
                        backgroundImage: "url('assets/images/mr2.jpg')",
                    }}
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
                                    </span>{" "}
                                    <span>
                                        Cars{" "}
                                        <i className="ion-ios-arrow-forward"></i>
                                    </span>
                                </p>
                                <h1 className="mb-3 bread">Choose Your Car</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-section bg-light">
                    <div className="container">
                        <div className="row">
                            {/* {console.log(cars)} */}
                            {cars.data.length > 0 ? (
                                cars.data.map((car) => (
                                    <div key={car.id} className="col-md-4">
                                        <div className="car-wrap rounded ftco-animate">
                                            <div
                                                className="img rounded d-flex align-items-end"
                                                style={{
                                                    backgroundImage: `url('${car.images[0]}')`,
                                                }}
                                            ></div>

                                            <div className="text">
                                                <h2 className="mb-0">
                                                    <Link href="car-single.html">
                                                        {car.make} {car.model}
                                                    </Link>
                                                </h2>
                                                <div className="d-flex mb-3">
                                                    <span className="cat">
                                                        {car.year}
                                                    </span>
                                                    <p className="price ml-auto">
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
                                                    <Link
                                                        href="#"
                                                        className="btn btn-primary py-2 mr-1"
                                                    >
                                                        Contact Owner
                                                    </Link>
                                                    <Link
                                                        href="car-single"
                                                        // make single car page
                                                        className="btn btn-secondary py-2 ml-1"
                                                    >
                                                        Details
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No cars</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* pagination */}
                <div
                    className="flex justify-center pb-20"
                    style={{ backgroundColor: "#f8f9fa" }}
                >
                    {cars.links.map((link) =>
                        link.url ? (
                            <Link
                                key={link.label}
                                href={link.url}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                                className={`p-1 px-3 mx-3 hover:bg-blue-200 transition duration-300 rounded ${
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
            </MainLayout>
        </>
    );
};
export default CarsPage;
