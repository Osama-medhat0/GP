import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";

const CarsList = () => {
    return (
        <>
            <MainLayout>
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
                            <div className="col-md-4">
                                <div className="car-wrap rounded ftco-animate">
                                    <div
                                        className="img rounded d-flex align-items-end"
                                        style={{
                                            backgroundImage:
                                                "url('assets/images/bg_1.jpg')",
                                        }}
                                    ></div>
                                    <div className="text">
                                        <h2 className="mb-0">
                                            <Link href="car-single.html">
                                                Mercedes Grand Sedan
                                            </Link>
                                        </h2>
                                        <div className="d-flex mb-3">
                                            <span className="cat">
                                                Cheverolet
                                            </span>
                                            <p className="price ml-auto">
                                                $500 <span>/day</span>
                                            </p>
                                        </div>
                                        <p className="d-flex mb-0 d-block">
                                            <Link
                                                href="#"
                                                className="btn btn-primary py-2 mr-1"
                                            >
                                                Book now
                                            </Link>{" "}
                                            <Link
                                                href="car-single.html"
                                                className="btn btn-secondary py-2 ml-1"
                                            >
                                                Details
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </>
    );
};
export default CarsList;
