import React from "react";
import {
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
    CSidebarNav,
    CNavGroup,
    CNavItem,
    CNavTitle,
} from "@coreui/react";
import { Link } from "@inertiajs/react";
import CIcon from "@coreui/icons-react";
import { CCardBody } from "@coreui/react";
// or
import {
    cilCloudDownload,
    cilLayers,
    cilPuzzle,
    cilSpeedometer,
    cilUser,
} from "@coreui/icons";

export const UserSidebar = () => {
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
                    <CIcon customClassName="nav-icon" icon={cilSpeedometer} />{" "}
                    Modify car listings
                </CNavItem>
            </CSidebarNav>
        </CSidebar>
    );
};

export default UserSidebar;
