import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Navbar = () => {
    // const [isScrolled, setIsScrolled] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.scrollY > 50) {
    //             setIsScrolled(true);
    //         } else {
    //             setIsScrolled(false);
    //         }
    //     };
    //     console.log(window.scrollY);
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    return (
        // <nav
        //     className={`navbar navbar-expand-lg navbar-light bg-white ${
        //         isScrolled ? "fixed-top shadow-sm" : ""
        //     }`}
        // >
        <nav
            className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
            id="ftco-navbar"
        >
            <div className="container">
                <Link className="navbar-brand" href="/home">
                    Car<span>Book</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#ftco-nav"
                    aria-controls="ftco-nav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="oi oi-menu"> Menu</span>
                </button>
                <div>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link href="/home" className="nav-link text-black">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/home" className="nav-link text-black">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                href="/services"
                                className="nav-link text-black"
                            >
                                Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                href="/pricing"
                                className="nav-link text-black"
                            >
                                Pricing
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/cars" className="nav-link text-black">
                                Cars
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/blog" className="nav-link text-black">
                                Blog
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                href="/contact"
                                className="nav-link text-black"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
