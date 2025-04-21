import { Link, usePage } from "@inertiajs/react";
import MainLayout from "../../Layouts/MainLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import SearchContent from "./Components/SearchContent";
import {
    FaCar,
    FaMoneyBillWave,
    FaTachometerAlt,
    FaBalanceScale,
} from "react-icons/fa";

const Home = () => {
    const cars = usePage().props.featuredCars;
    const user = usePage().props.auth.user;
    console.log(user);
    console.log(cars);
    return (
        <>
            <MainLayout>
                <div
                    className="hero-wrap ftco-degree-bg"
                    style={{ backgroundImage: 'url("assets/images/bg_1.jpg")' }}
                    data-stellar-background-ratio="0.5"
                >
                    <div className="overlay" />
                    <div className="container">
                        <div className="row no-gutters slider-text justify-content-start align-items-center justify-content-center">
                            <div className="col-lg-8 ftco-animate">
                                <div className="text text-center mb-md-5 pb-md-5 ">
                                    <h1 className="mb-4 mx-0 px-0 w-xl">
                                        Find Your Perfect Car Or Sell With Ease
                                    </h1>
                                    <p className="pt-" style={{ fontSize: 18 }}>
                                        List, Discover, Compare &amp; Estimate
                                        Fair Price Of Any Car
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="ftco-section ftco-no-pt bg-light">
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-md-12   featured-top">
                                <section id="searchContent">
                                    <div className="row no-gutters pt-5">
                                        <SearchContent />
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-section ftco-no-pt bg-light">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-12 heading-section text-center ftco-animate mb-5">
                                <span className="subheading">
                                    Find Your Next Car{" "}
                                </span>
                                <h2 className="mb-2">Featured Listings</h2>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="carousel-car owl-carousel">
                                {cars.length > 0 ? (
                                    cars.map((car) => (
                                        <div key={car.id} className="item">
                                            <div className="car-wrap rounded ftco-animate">
                                                <div
                                                    className="img rounded d-flex align-items-end"
                                                    style={{
                                                        backgroundImage: `url(/storage/${
                                                            JSON.parse(
                                                                car.images
                                                            )[0]
                                                        })`,
                                                        height: "250px",
                                                        backgroundSize: "cover",
                                                        backgroundPosition:
                                                            "center",
                                                    }}
                                                ></div>
                                                <div className="text">
                                                    <h2 className="mb-0">
                                                        <Link
                                                            href={route(
                                                                "car.detail",
                                                                car.id
                                                            )}
                                                        >
                                                            {car.make}{" "}
                                                            {car.model}
                                                        </Link>
                                                    </h2>
                                                    <div className="d-flex mb-3">
                                                        <span className="cat">
                                                            {car.year}
                                                        </span>
                                                        <p className="price ml-auto">
                                                            {parseFloat(
                                                                car.price
                                                            ).toLocaleString(
                                                                "en-US",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "USD",
                                                                }
                                                            )}
                                                        </p>
                                                    </div>
                                                    <p className="d-flex mb-0 d-block">
                                                        {user &&
                                                        car.user_id ===
                                                            user.id ? (
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
                                                                onClick={(
                                                                    e
                                                                ) => {
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
                                                                { id: car.id }
                                                            )}
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
                                    <p>No cars available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-section ftco-about">
                    <div className="container">
                        <div className="row no-gutters">
                            <div
                                className="col-md-6 p-md-5 img img-2 d-flex justify-content-center align-items-center"
                                style={{
                                    backgroundImage:
                                        "url(assets/images/porsche.jpeg)",
                                }}
                            ></div>
                            <div className="col-md-6 wrap-about ftco-animate">
                                <div className="heading-section heading-section-white pl-md-5">
                                    <span className="subheading">About us</span>
                                    <h2 className="mb-4">
                                        Welcome to FairWheels
                                    </h2>
                                    <p>
                                        Welcome to Car Retail Website — your
                                        ultimate destination for buying and
                                        selling cars with ease and confidence.
                                        Our platform is designed to bridge the
                                        gap between buyers and sellers by
                                        offering a seamless, user-friendly
                                        experience.
                                    </p>
                                    <p>
                                        With our advanced AI-powered price
                                        recommendation system, we help both car
                                        owners and potential buyers make
                                        informed decisions based on accurate
                                        market data. Our detailed car listings,
                                        robust search filters, and intuitive
                                        comparison feature ensure that you find
                                        the right car at the right price.
                                    </p>
                                    <p className="pt-3">
                                        <Link
                                            href={route("cars.page")}
                                            className="btn py-3 px-4"
                                            style={{
                                                backgroundColor: "#1089ff",
                                                color: "#fff",
                                                borderRadius: 10,
                                                fontSize: 17,
                                            }}
                                        >
                                            Search Vehicle
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="col-md-7 text-center heading-section ftco-animate">
                                <span className="subheading">Services</span>
                                <h2 className="mb-3">Our Latest Services</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="services services-2 w-100 text-center">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <FaCar
                                            size={40}
                                            style={{ color: "#fff" }}
                                        />
                                    </div>
                                    <div className="text w-100">
                                        <h3 className="heading mb-2">
                                            Car Sales
                                        </h3>
                                        <p>
                                            Find the perfect car for you from
                                            our wide variety of listings.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="services services-2 w-100 text-center">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <FaMoneyBillWave
                                            size={40}
                                            style={{ color: "#fff" }}
                                        />
                                    </div>
                                    <div className="text w-100">
                                        <h3 className="heading mb-2">
                                            Price Estimation
                                        </h3>
                                        <p>
                                            Get accurate car price predictions
                                            powered by AI models.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="services services-2 w-100 text-center">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <FaTachometerAlt
                                            size={40}
                                            style={{ color: "#fff" }}
                                        />
                                    </div>
                                    <div className="text w-100">
                                        <h3 className="heading mb-2">
                                            Performance Insights
                                        </h3>
                                        <p>
                                            Check car mileage, engine size, and
                                            performance statistics.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="services services-2 w-100 text-center">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <FaBalanceScale
                                            size={40}
                                            style={{ color: "#fff" }}
                                        />
                                    </div>
                                    <div className="text w-100">
                                        <h3 className="heading mb-2">
                                            Compare Cars
                                        </h3>
                                        <p>
                                            Compare multiple cars side-by-side
                                            and make the best choice.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="ftco-section ftco-intro"
                    style={{ backgroundImage: "url(assets/images/gtr.jpg)" }}
                >
                    <div className="overlay" />
                    <div className="container">
                        <div className="row justify-content-end">
                            <div className="col-md-6 heading-section heading-section-white ftco-animate">
                                <h2 className="mb-3">
                                    Ready to Sell Your Car? Don’t Wait — Start
                                    Now!
                                </h2>
                                <Link
                                    href={route("car.listing")}
                                    className="btn btn-primary btn-lg"
                                >
                                    List Your Car
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-section testimony-section bg-light">
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="col-md-7 text-center heading-section ftco-animate">
                                <span className="subheading">Testimonial</span>
                                <h2 className="mb-3">Happy Clients</h2>
                            </div>
                        </div>
                        <div className="row ftco-animate">
                            <div className="col-md-12">
                                <div className="carousel-testimony owl-carousel ftco-owl">
                                    <div className="item">
                                        <div className="testimony-wrap rounded text-center py-4 pb-5">
                                            <div
                                                className="user-img mb-2"
                                                style={{
                                                    backgroundImage:
                                                        "url(assets/images/person_1.jpg)",
                                                }}
                                            ></div>
                                            <div className="text pt-4">
                                                <p className="mb-4">
                                                    Great platform for both
                                                    buyers and sellers. The AI
                                                    price prediction is spot on!
                                                </p>
                                                <p className="name">
                                                    Roger Scott
                                                </p>
                                                <span className="position">
                                                    Marketing Manager
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="testimony-wrap rounded text-center py-4 pb-5">
                                            <div
                                                className="user-img mb-2"
                                                style={{
                                                    backgroundImage:
                                                        "url(assets/images/person_2.jpg)",
                                                }}
                                            ></div>
                                            <div className="text pt-4">
                                                <p className="mb-4">
                                                    I found my dream car here at
                                                    an amazing price. Fantastic
                                                    experience!
                                                </p>
                                                <p className="name">
                                                    Roger Scott
                                                </p>
                                                <span className="position">
                                                    Interface Designer
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="testimony-wrap rounded text-center py-4 pb-5">
                                            <div
                                                className="user-img mb-2"
                                                style={{
                                                    backgroundImage:
                                                        "url(assets/images/person_3.jpg)",
                                                }}
                                            ></div>
                                            <div className="text pt-4">
                                                <p className="mb-4">
                                                    Great platform for both
                                                    buyers and sellers. The AI
                                                    price prediction is spot on!
                                                </p>
                                                <p className="name">
                                                    Roger Scott
                                                </p>
                                                <span className="position">
                                                    UI Designer
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="testimony-wrap rounded text-center py-4 pb-5">
                                            <div
                                                className="user-img mb-2"
                                                style={{
                                                    backgroundImage:
                                                        "url(assets/images/person_1.jpg)",
                                                }}
                                            ></div>
                                            <div className="text pt-4">
                                                <p className="mb-4">
                                                    The comparison feature
                                                    helped me choose the best
                                                    car for my budget.
                                                </p>
                                                <p className="name">
                                                    Roger Scott
                                                </p>
                                                <span className="position">
                                                    Web Developer
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="testimony-wrap rounded text-center py-4 pb-5">
                                            <div
                                                className="user-img mb-2"
                                                style={{
                                                    backgroundImage:
                                                        "url(assets/images/person_1.jpg)",
                                                }}
                                            ></div>
                                            <div className="text pt-4">
                                                <p className="mb-4">
                                                    This platform made selling
                                                    my car so easy and fast.
                                                    Highly recommended!
                                                </p>
                                                <p className="name">
                                                    Roger Scott
                                                </p>
                                                <span className="position">
                                                    System Analyst
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="col-md-7 heading-section text-center ftco-animate">
                                <span className="subheading">Blog</span>
                                <h2>Recent Blog</h2>
                            </div>
                        </div>
                        <div className="row d-flex">
                            <div className="col-md-4 d-flex ftco-animate">
                                <div className="blog-entry justify-content-end">
                                    <a
                                        href="blog-single.html"
                                        className="block-20"
                                        style={{
                                            backgroundImage:
                                                'url("assets/images/image_1.jpg")',
                                        }}
                                    ></a>
                                    <div className="text pt-4">
                                        <div className="meta mb-3">
                                            <div>
                                                <a href="#">Oct. 29, 2019</a>
                                            </div>
                                            <div>
                                                <a href="#">Admin</a>
                                            </div>
                                            <div>
                                                <a
                                                    href="#"
                                                    className="meta-chat"
                                                >
                                                    <span className="icon-chat" />{" "}
                                                    3
                                                </a>
                                            </div>
                                        </div>
                                        <h3 className="heading mt-2">
                                            <a href="#">
                                                Why Lead Generation is Key for
                                                Business Growth
                                            </a>
                                        </h3>
                                        <p>
                                            <a
                                                href="#"
                                                className="btn btn-primary"
                                            >
                                                Read more
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex ftco-animate">
                                <div className="blog-entry justify-content-end">
                                    <a
                                        href="blog-single.html"
                                        className="block-20"
                                        style={{
                                            backgroundImage:
                                                'url("assets/images/image_2.jpg")',
                                        }}
                                    ></a>
                                    <div className="text pt-4">
                                        <div className="meta mb-3">
                                            <div>
                                                <a href="#">Oct. 29, 2019</a>
                                            </div>
                                            <div>
                                                <a href="#">Admin</a>
                                            </div>
                                            <div>
                                                <a
                                                    href="#"
                                                    className="meta-chat"
                                                >
                                                    <span className="icon-chat" />{" "}
                                                    3
                                                </a>
                                            </div>
                                        </div>
                                        <h3 className="heading mt-2">
                                            <a href="#">
                                                Why Lead Generation is Key for
                                                Business Growth
                                            </a>
                                        </h3>
                                        <p>
                                            <a
                                                href="#"
                                                className="btn btn-primary"
                                            >
                                                Read more
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex ftco-animate">
                                <div className="blog-entry">
                                    <a
                                        href="blog-single.html"
                                        className="block-20"
                                        style={{
                                            backgroundImage:
                                                'url("assets/images/image_3.jpg")',
                                        }}
                                    ></a>
                                    <div className="text pt-4">
                                        <div className="meta mb-3">
                                            <div>
                                                <a href="#">Oct. 29, 2019</a>
                                            </div>
                                            <div>
                                                <a href="#">Admin</a>
                                            </div>
                                            <div>
                                                <a
                                                    href="#"
                                                    className="meta-chat"
                                                >
                                                    <span className="icon-chat" />{" "}
                                                    3
                                                </a>
                                            </div>
                                        </div>
                                        <h3 className="heading mt-2">
                                            <a href="#">
                                                Why Lead Generation is Key for
                                                Business Growth
                                            </a>
                                        </h3>
                                        <p>
                                            <a
                                                href="#"
                                                className="btn btn-primary"
                                            >
                                                Read more
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    className="ftco-counter ftco-section img bg-light"
                    id="section-counter"
                >
                    <div className="overlay" />
                    <div className="container pl-19">
                        <div className="row">
                            <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ftco-animate">
                                <div className="block-18">
                                    <div className="text text-border d-flex align-items-center">
                                        <strong
                                            className="number"
                                            data-number={45}
                                        >
                                            0
                                        </strong>
                                        <span>
                                            Year <br />
                                            Experienced
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ftco-animate">
                                <div className="block-18">
                                    <div className="text text-border d-flex align-items-center">
                                        <strong
                                            className="number"
                                            data-number={10090}
                                        >
                                            0
                                        </strong>
                                        <span>
                                            Total <br />
                                            Cars
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ftco-animate">
                                <div className="block-18">
                                    <div className="text text-border d-flex align-items-center">
                                        <strong
                                            className="number"
                                            data-number={3620}
                                        >
                                            0
                                        </strong>
                                        <span>
                                            Happy <br />
                                            Customers
                                        </span>
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
export default Home;
