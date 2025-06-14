import { Link, usePage } from "@inertiajs/react";
import { useSidebarContext } from "./SidebarContext";
import Navbar from "react-bootstrap/Navbar";
import { MessageCircle } from "lucide-react";
const Sidebar = () => {
    const { sidebarActive, setSidebarActive } = useSidebarContext();
    const user = usePage().props.auth.user;
    return (
        <>
            <div
                className={`off-canvas-menu dashboard-off-canvas-menu off--canvas-menu custom-scrollbar-styled pt-20px ${
                    sidebarActive ? "active" : ""
                }`}
            >
                <div
                    onClick={() => setSidebarActive(false)}
                    className="off-canvas-menu-close dashboard-menu-close icon-element icon-element-sm shadow-sm"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Close menu"
                >
                    <i className="la la-times" />
                </div>
                <Navbar.Brand
                    href={route("home")}
                    style={{
                        fontWeight: "bold",
                        fontSize: 30,
                    }}
                    className=" hidden sm:block pl-3"
                >
                    <span style={{ color: "black" }}>Fair</span>
                    <span style={{ color: "#01D28E" }}>Wheels</span>
                </Navbar.Brand>
                {/* end off-canvas-menu-close */}

                <ul className="generic-list-item off-canvas-menu-list off--canvas-menu-list pt-35px ">
                    <li
                        className={
                            route().current("admin.dashboard") ||
                            route().current("dashboard")
                                ? "page-active"
                                : ""
                        }
                    >
                        {" "}
                        <Link href={route("dashboard")}>
                            <svg
                                className="mr-3 pb-1"
                                xmlns="http://www.w3.org/2000/svg"
                                height="29px"
                                viewBox="0 0 24 24"
                                width="34px"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z" />
                            </svg>{" "}
                            Dashboard
                        </Link>
                    </li>
                    <li
                        className={
                            route().current("profile.edit") ? "page-active" : ""
                        }
                    >
                        <Link href={route("profile.edit")}>
                            <img
                                src="/profile.svg"
                                alt="Profile"
                                className="mr-3 pb-1 w-9 h-9"
                            />
                            Profile
                        </Link>
                    </li>
                    {user.role === "admin" && (
                        <>
                            <li
                                className={
                                    route().current("admin.users")
                                        ? "page-active"
                                        : ""
                                }
                            >
                                <Link href={route("admin.users")}>
                                    <img
                                        src="/assets/icons/users-management-icon.png"
                                        alt="Users Management"
                                        className="mr-3 pb-1 w-9 h-9"
                                    />
                                    Manage users
                                </Link>
                            </li>

                            <li
                                className={
                                    route().current("manager.index")
                                        ? "page-active"
                                        : ""
                                }
                            >
                                <Link href={route("manager.index")}>
                                    <img
                                        src="/assets/icons/car-management.png"
                                        alt="Listed Car"
                                        className="mr-3 pb-1 w-10 h-11"
                                    />
                                    Manage Cars
                                </Link>
                            </li>
                        </>
                    )}
                    {user.role === "user" && (
                        <>
                            <li
                                className={
                                    route().current("car.listing")
                                        ? "page-active"
                                        : ""
                                }
                            >
                                <Link href={route("car.listing")}>
                                    <img
                                        src="/car.png"
                                        alt="Profile"
                                        className="mr-3 pb-1 w-9 h-9"
                                    />{" "}
                                    Sell your car
                                </Link>
                            </li>

                            <li
                                className={
                                    route().current("car.edit")
                                        ? "page-active"
                                        : ""
                                }
                            >
                                <Link href={route("car.edit")}>
                                    <img
                                        src="/listed-car.png"
                                        alt="Listed Car"
                                        className="mr-3 pb-1 w-9 h-9"
                                    />
                                    Listed Car
                                </Link>
                            </li>
                        </>
                    )}
                    <li
                        className={
                            route().current("live.chat") ? "page-active" : ""
                        }
                    >
                        <Link href={route("live.chat")}>
                            <MessageCircle className=" ml-1 mr-4" />
                            Live Chat
                        </Link>
                    </li>
                    <li
                        className={
                            route().current("blog.create") ? "page-active" : ""
                        }
                    >
                        <Link href={route("blog.create")}>
                            <img
                                src="/assets/icons/blog.png"
                                alt="Listed Car"
                                className="mr-3 pb-1 w-10 h-11"
                            />
                            Publish Blog
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
