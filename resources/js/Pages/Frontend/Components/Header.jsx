import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "@/Components/Dropdown";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useSidebarContext } from "../Dashboard/Components/SidebarContext";

export default function Header({ showLogo, head }) {
    const user = usePage().props.auth?.user ?? null;

    const firstName = user ? user.name.split(" ")[0] : "Guest";
    const capitalizeFirstName =
        firstName.charAt(0).toUpperCase() + firstName.slice(1);

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const { sidebarActive, setSidebarActive } = useSidebarContext();
    const context = useSidebarContext();
    // console.log(context);

    return (
        <>
            <Navbar
                className="sticky-top shadow-sm py-0"
                bg="light"
                data-bs-theme="light"
            >
                <Container>
                    {/* For large screens */}
                    {!showLogo && (
                        <Link href={route("home")} className="no-underline">
                            <Navbar.Brand
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "1.5rem",
                                }}
                            >
                                <span style={{ color: "black" }}>Fair</span>
                                <span style={{ color: "#01D28E" }}>Wheels</span>
                            </Navbar.Brand>
                        </Link>
                    )}

                    <div className="ml-auto text-right hidden sm:flex ">
                        <Nav className="me-auto">
                            <Link
                                className={`block no-underline mr-5 py-4 text-gray-700 text-md ${
                                    route().current("cars.page")
                                        ? "text-green-500 font-bold"
                                        : ""
                                }`}
                                href={route("cars.page")}
                            >
                                Discover
                            </Link>
                            <Link
                                className={`block no-underline mr-5 py-4 text-gray-700 text-md ${
                                    route().current("estimate.price")
                                        ? "text-green-500 font-bold"
                                        : ""
                                }`}
                                href={route("estimate.price")}
                            >
                                Estimate Price
                            </Link>

                            <Link
                                className={`block no-underline mr-5 py-4 text-gray-700 text-md ${
                                    route().current("car.listing")
                                        ? "text-green-500 font-bold"
                                        : ""
                                }`}
                                href={route("car.listing")}
                            >
                                Sell Your Car
                            </Link>
                            <Link
                                className={`block no-underline mr-5 py-4 text-gray-700 text-md ${
                                    route().current("blog")
                                        ? "text-green-500 font-bold"
                                        : ""
                                }`}
                                href={route("blog")}
                            >
                                Blog
                            </Link>
                            {user ? (
                                <Link
                                    href={
                                        user.role === "admin"
                                            ? route("admin.dashboard")
                                            : route("dashboard")
                                    }
                                    className={`block no-underline mr-5 py-4 text-gray-700 text-md
                                        ${
                                            route().current("admin.dashboard")
                                                ? "text-green-500 font-bold"
                                                : ""
                                        }
                                        ${
                                            route().current("dashboard")
                                                ? "text-green-500 font-bold"
                                                : ""
                                        }`}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    {/* login isnt responsive */}
                                    <Link
                                        href={route("login")}
                                        className={`block no-underline ml-3 mr-2 py-4 text-blue-400 font-bold`}
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className={`block no-underline ml-3 py-4 text-blue-400 font-bold`}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </Nav>

                        {user && (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md mt-1">
                                        <button
                                            type="button"
                                            className="inline-flex my-3 items-center rounded-md bg-white px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
                                        >
                                            {capitalizeFirstName}
                                            <svg
                                                className="ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link
                                        href={route("profile.edit")}
                                        className={`no-underline ${
                                            route().current("profile.edit")
                                                ? "text-green-500 font-bold"
                                                : ""
                                        }`}
                                    >
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="text-gray-500 hover:text-red-500"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="py-0 sm:hidden mt-2 pl-4 flex">
                        <Link
                            className={`inline-flex rounded-md  mr-4 text-gray-700 text-sm ${
                                route().current("cars.page")
                                    ? "text-green-500 font-bold"
                                    : ""
                            }`}
                            href={route("cars.page")}
                        >
                            Discover
                        </Link>
                        <Link
                            className={`inline-flex rounded-md mr-4 mb-2 text-gray-700 text-sm ${
                                route().current("estimate.price")
                                    ? "text-green-500 font-bold"
                                    : ""
                            }`}
                            href={route("estimate.price")}
                        >
                            Estimate Price
                        </Link>
                        <button
                            className="inline-flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100"
                            onClick={() => {
                                if (
                                    route().current("home") ||
                                    route().current("cars.page") ||
                                    route().current("comparison") ||
                                    route().current("profile.edit") ||
                                    route().current("blog") ||
                                    route().current("blog.show")
                                ) {
                                    setShowingNavigationDropdown(
                                        !showingNavigationDropdown
                                    );
                                } else {
                                    setSidebarActive(true);
                                    console.log(showingNavigationDropdown);
                                }
                            }}
                        >
                            <svg
                                className="h-6 w-6 "
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div
                        className={`
                            ${
                                (showingNavigationDropdown
                                    ? "block"
                                    : "hidden") + " sm:hidden"
                            }
                        `}
                    >
                        <hr className=" my-2 border-gray-900" />
                        {user?.role === "admin" && (
                            <>
                                <Link
                                    className={`block no-underline   text-gray-700 text-md ${
                                        route().current("dashboard")
                                            ? "text-green-500 font-bold"
                                            : ""
                                    }`}
                                    href={route("dashboard")}
                                >
                                    Dashboard
                                </Link>
                                <hr className=" my-2 border-gray-900" />
                                <Link
                                    className="no-underline  text-gray-700 text-md"
                                    href={route("admin.users")}
                                >
                                    Manage Users
                                </Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Link
                                    className={`no-underline  text-gray-700 text-md ${
                                        route().current("profile.edit")
                                            ? "text-green-500 font-bold"
                                            : ""
                                    }`}
                                    href={route("profile.edit")}
                                >
                                    Profile
                                </Link>
                                <hr className=" my-2 border-gray-900" />
                                <Link
                                    className={` block no-underline  text-gray-700 text-md  ${
                                        route().current("dashboard")
                                            ? "text-green-500"
                                            : ""
                                    }`}
                                    href={route("dashboard")}
                                >
                                    Dashboard
                                </Link>
                                <hr className=" my-2 border-gray-900" />

                                <Link
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                    className="text-red-500 mb-2"
                                >
                                    Log Out
                                </Link>
                            </>
                        )}
                        {!user && (
                            <>
                                <div className="flex flex-col">
                                    <Link
                                        href={route("login")}
                                        className="no-underline mb-2"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="no-underline mb-2"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </Container>
            </Navbar>
            {head && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {head}
                    </div>
                </header>
            )}

            {/*when click on screen sidebar disappear  */}
            <div
                className={`body-overlay  ${sidebarActive ? "active" : ""}`}
                onClick={() => setSidebarActive(false)}
            />
        </>
    );
}
