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
                                                "url('assets/images/mr.jpeg')",
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
                            <div className="col-md-4">
                                <div className="car-wrap rounded ftco-animate">
                                    <div
                                        className="img rounded d-flex align-items-end"
                                        style={{
                                            backgroundImage:
                                                "url('assets/images/mr.jpeg')",
                                        }}
                                    ></div>
                                    <div className="text">
                                        <h2 className="mb-0">
                                            <Link href="car-single.html">
                                                Range Rover
                                            </Link>
                                        </h2>
                                        <div className="d-flex mb-3">
                                            <span className="cat">Subaru</span>
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
                                                Range Rover
                                            </Link>
                                        </h2>
                                        <div className="d-flex mb-3">
                                            <span className="cat">Subaru</span>
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
                                                Range Rover
                                            </Link>
                                        </h2>
                                        <div className="d-flex mb-3">
                                            <span className="cat">Subaru</span>
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
                                                Range Rover
                                            </Link>
                                        </h2>
                                        <div className="d-flex mb-3">
                                            <span className="cat">Subaru</span>
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
                        <div className="row mt-5">
                            <div className="col text-center">
                                <div className="block-27">
                                    <ul>
                                        <li>
                                            <Link href="#">&lt;</Link>
                                        </li>
                                        <li
                                            className="active"
                                            style={{
                                                backgroundColor: "",
                                            }}
                                        >
                                            <span>1</span>
                                        </li>
                                        <li>
                                            <Link href="#">2</Link>
                                        </li>
                                        <li>
                                            <Link href="#">3</Link>
                                        </li>
                                        <li>
                                            <Link href="#">4</Link>
                                        </li>
                                        <li>
                                            <Link href="#">5</Link>
                                        </li>
                                        <li>
                                            <Link href="#">&gt;</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className="ftco-section ftco-no-pt bg-light">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-12 heading-section text-center ftco-animate mb-5">
                                <span className="subheading">
                                    What we offer
                                </span>
                                <h2 className="mb-2">Feeatured Vehicles</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="carousel-car owl-carousel">
                                    <div className="item">
                                        <div className="car-wrap rounded ftco-animate">
                                            <div
                                                className="img rounded d-flex align-items-end"
                                                style={{
                                                    backgroundImage:
                                                        "url(assets/images/car-1.jpg)",
                                                }}
                                            ></div>
                                            <div className="text">
                                                <h2 className="mb-0">
                                                    <Link href="#">
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
                                                        href="#"
                                                        className="btn btn-secondary py-2 ml-1"
                                                    >
                                                        Details
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="car-wrap rounded ftco-animate">
                                            <div
                                                className="img rounded d-flex align-items-end"
                                                style={{
                                                    backgroundImage:
                                                        "url(assets/images/car-2.jpg)",
                                                }}
                                            ></div>
                                            <div className="text">
                                                <h2 className="mb-0">
                                                    <Link href="#">
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
                                                        href="#"
                                                        className="btn btn-secondary py-2 ml-1"
                                                    >
                                                        Details
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="car-wrap rounded ftco-animate">
                                            <div
                                                className="img rounded d-flex align-items-end"
                                                style={{
                                                    backgroundImage:
                                                        "url(assets/images/car-3.jpg)",
                                                }}
                                            ></div>
                                            <div className="text">
                                                <h2 className="mb-0">
                                                    <Link href="#">
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
                                                        href="#"
                                                        className="btn btn-secondary py-2 ml-1"
                                                    >
                                                        Details
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="car-wrap rounded ftco-animate">
                                            <div
                                                className="img rounded d-flex align-items-end"
                                                style={{
                                                    backgroundImage:
                                                        "url(assets/images/car-4.jpg)",
                                                }}
                                            ></div>
                                            <div className="text">
                                                <h2 className="mb-0">
                                                    <Link href="#">
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
                                                        href="#"
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
                        </div>
                    </div>
                </section> */}
            </MainLayout>
        </>
    );
};
export default CarsList;
