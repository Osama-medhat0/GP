import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { useSidebarContext } from "../Dashboard/Components/SidebarContext";

export default function Header({ showLogo, head }) {
    const user = usePage().props.auth.user;
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
                        <Navbar.Brand
                            href="/home"
                            style={{ fontWeight: "bold", fontSize: 30 }}
                            className="hidden sm:block"
                        >
                            <span style={{ color: "black" }}>Fair</span>
                            <span style={{ color: "#01D28E" }}>Wheels</span>
                        </Navbar.Brand>
                    )}

                    {/* For small screens */}
                    {/* <Navbar.Brand
                        href="/home"
                        style={{ fontWeight: "bold", fontSize: 30 }}
                        className="block sm:hidden"
                    >
                        <span style={{ color: "black" }}>Fair</span>
                        <span style={{ color: "#01D28E" }}>Wheels</span>
                    </Navbar.Brand> */}

                    <div className="ml-auto text-right hidden sm:flex ">
                        <Nav className="me-auto">
                            <NavLink
                                style={{
                                    marginRight: "35px",
                                    fontSize: "17px",
                                }}
                                className={`mr-5 block no-underline ${
                                    route().current("home")
                                        ? "text-green-500 font-bold"
                                        : ""
                                }`}
                                href={route("home")}
                                // active={route().current("/")}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                style={{
                                    marginRight: "35px",
                                    fontSize: "17px",
                                }}
                                className="mr-5 block no-underline"
                                href={route("car.page")}
                            >
                                Cars
                            </NavLink>
                            <NavLink
                                style={{
                                    marginRight: "35px",
                                    fontSize: "17px",
                                }}
                                className="mr-5 block no-underline"
                                href="#ai-tool"
                            >
                                AI Tool
                            </NavLink>

                            <NavLink
                                style={{
                                    marginRight: "35px",
                                    fontSize: "17px",
                                }}
                                className={`mr-5 block no-underline ${
                                    route().current("car.listing")
                                        ? "text-green-500 font-bold"
                                        : ""
                                }`}
                                href={route("car.listing")}
                            >
                                Sell Your Car
                            </NavLink>

                            {user ? (
                                <NavLink
                                    href={
                                        user.role === "admin"
                                            ? route("admin.dashboard")
                                            : route("dashboard")
                                    }
                                    className={`rounded-md px-3 py-2 transition no-underline mr-12 mt-1 pt-2
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
                                    style={{
                                        fontSize: "17px",
                                    }}
                                >
                                    Dashboard
                                </NavLink>
                            ) : (
                                <>
                                    {/* login isnt responsive */}
                                    <NavLink
                                        href={route("login")}
                                        className="rounded-md px-4 py-1 text-black text-lg transition "
                                    >
                                        Log in
                                    </NavLink>
                                    <NavLink
                                        href={route("register")}
                                        className="rounded-md px-2 py-1 text-black text-lg transition"
                                    >
                                        Register
                                    </NavLink>
                                </>
                            )}
                        </Nav>

                        {user && (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md mt-1">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
                                        >
                                            {user.name}
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
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() => {
                                if (route().current("home")) {
                                    setShowingNavigationDropdown(
                                        !showingNavigationDropdown
                                    );
                                } else {
                                    setSidebarActive(true);
                                }
                            }}
                            className="inline-flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                        >
                            <svg
                                className="h-6 w-6"
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
                        <ResponsiveNavLink
                            className={`mr-5 block no-underline ${
                                route().current("home")
                                    ? "text-green-500 font-bold"
                                    : ""
                            }`}
                            href={route("home")}
                        >
                            Home
                        </ResponsiveNavLink>

                        {user?.role === "admin" && (
                            <>
                                <ResponsiveNavLink
                                    className={`mr-5 block no-underline ${
                                        route().current("dashboard")
                                            ? "text-green-500 font-bold"
                                            : ""
                                    }`}
                                    href={route("dashboard")}
                                >
                                    Dashboard
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    className="no-underline"
                                    href={route("admin.users")}
                                >
                                    Manage Users
                                </ResponsiveNavLink>
                            </>
                        )}

                        {user && (
                            <>
                                <ResponsiveNavLink
                                    className={`no-underline ${
                                        route().current("profile.edit")
                                            ? "text-green-500 font-bold"
                                            : ""
                                    }`}
                                    href={route("profile.edit")}
                                >
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    className={`mr-5 block no-underline ${
                                        route().current("dashboard")
                                            ? "text-green-500 font-bold"
                                            : ""
                                    }`}
                                    href={route("dashboard")}
                                >
                                    Dashboard
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </>
                        )}
                        {!user && (
                            <>
                                <ResponsiveNavLink
                                    href={route("login")}
                                    className="no-underline"
                                >
                                    Log in
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("register")}
                                    className="no-underline"
                                >
                                    Register
                                </ResponsiveNavLink>
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
