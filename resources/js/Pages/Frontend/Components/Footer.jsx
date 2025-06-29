import { Link } from "@inertiajs/react";

const Footer = () => {
    return (
        <>
            <footer className="ftco-footer ftco-bg-dark ftco-section">
                <div className="container">
                    <div className="row mb-1">
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">
                                    <a href="#" className="logo">
                                        Fair<span>Wheels</span>
                                    </a>
                                </h2>
                                <p>
                                    Your trusted partner for buying and selling
                                    cars with ease. Connecting car lovers and
                                    providing the best deals, all in one place.
                                </p>
                                {/* <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                                    <li className="ftco-animate">
                                        <a href="#">
                                            <span className="icon-twitter" />
                                        </a>
                                    </li>
                                    <li className="ftco-animate">
                                        <a href="#">
                                            <span className="icon-facebook" />
                                        </a>
                                    </li>
                                    <li className="ftco-animate">
                                        <a href="#">
                                            <span className="icon-instagram" />
                                        </a>
                                    </li>
                                </ul> */}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4 ml-md-5">
                                <h2 className="ftco-heading-2">Information</h2>
                                <ul className="list-unstyled">
                                    <li>
                                        <a
                                            href="#about-us"
                                            className="py-2 d-block"
                                        >
                                            About Us
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a href="#" className="py-2 d-block">
                                            Services
                                        </a>
                                    </li> */}
                                    {/* <li>
                                        <a href="#" className="py-2 d-block">
                                            Term and Conditions
                                        </a>
                                    </li> */}
                                    {/* <li>
                                        <a href="#" className="py-2 d-block">
                                            Best Price Guarantee
                                        </a>
                                    </li> */}
                                    <li>
                                        <Link
                                            href={route("blog")}
                                            className="py-2 d-block"
                                        >
                                            Blog
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Services</h2>
                                <ul className="list-unstyled">
                                    <li>
                                        <Link
                                            href={route("cars.page")}
                                            className="py-2 d-block"
                                        >
                                            Discover listings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={route("cars.page")}
                                            className="py-2 d-block"
                                        >
                                            Compare Listings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={route("estimate.price")}
                                            className="py-2 d-block"
                                        >
                                            Estimate car price
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Contact Us</h2>
                                <div className="block-23 mb-3">
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <span className="icon icon-phone" />
                                                <span className="text">
                                                    01553511607
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            {/* <a href="mailto:FairWheels@gmail.com">
                                                <span className="icon icon-envelope" />
                                                <span className="text">
                                                    Send Us A Message
                                                </span>
                                            </a> */}
                                            <Link href={route("contact")}>
                                                <span className="icon icon-envelope" />
                                                <span className="text">
                                                    Send Us A Message
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
export default Footer;
