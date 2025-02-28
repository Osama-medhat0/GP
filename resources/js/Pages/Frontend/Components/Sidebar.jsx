import React from "react";
import {
    CSidebar,
    CSidebarHeader,
    CSidebarNav,
    CNavItem,
    CNavTitle,
} from "@coreui/react";
import { Link, usePage } from "@inertiajs/react";
import CIcon from "@coreui/icons-react";
import { cilCloudDownload, cilSpeedometer, cilUser } from "@coreui/icons";

export const UserSidebar = () => {
    const user = usePage().props.auth.user;
    console.log(user);
    return (
        <CSidebar
            className="border-end sidebar-top"
            colorScheme="dark"
            visible
            position="fixed"
        >
            <CSidebarHeader className="border-bottom">
                <div className="flex items-center">
                    <Link href="/" className="block no-underline">
                        <h1>
                            <span style={{ color: "White" }}>Fair</span>
                            <span style={{ color: "#01D28E" }}>Wheels</span>
                        </h1>
                    </Link>
                </div>
            </CSidebarHeader>

            <CSidebarNav>
                <CNavTitle>Dashboard</CNavTitle>
                <CNavItem>
                    <Link
                        href="/profile"
                        className="nav-link flex items-center"
                    >
                        <CIcon customClassName="nav-icon" icon={cilUser} />
                        Profile
                    </Link>
                </CNavItem>
                {user.role == "admin" ? (
                    <>
                        <CNavItem>
                            <Link
                                href="/admin/dashboard/users"
                                className="nav-link flex items-center"
                            >
                                <CIcon
                                    customClassName="nav-icon"
                                    icon={cilSpeedometer}
                                />
                                Manage Users
                            </Link>
                        </CNavItem>

                        <CNavItem href="#">
                            <CIcon
                                customClassName="nav-icon"
                                icon={cilSpeedometer}
                            />{" "}
                            Manage car listings
                        </CNavItem>
                        <CNavItem href="https://coreui.io">
                            <CIcon
                                customClassName="nav-icon"
                                icon={cilCloudDownload}
                            />{" "}
                            Mangage Q&A Forum
                        </CNavItem>
                    </>
                ) : (
                    <>
                        <CNavItem>
                            <Link
                                // href="/admin/dashboard/users"
                                className="nav-link flex items-center"
                            >
                                <CIcon
                                    customClassName="nav-icon"
                                    icon={cilSpeedometer}
                                />
                                List car
                            </Link>
                        </CNavItem>

                        <CNavItem href="#">
                            <CIcon
                                customClassName="nav-icon"
                                icon={cilSpeedometer}
                            />{" "}
                            Modify car listings
                        </CNavItem>
                    </>
                )}
            </CSidebarNav>
        </CSidebar>
    );
};

export default UserSidebar;
