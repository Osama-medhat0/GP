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
} from "@coreui/icons";

export const SidebarExample = () => {
    return (
        <CSidebar
            className="border-end sidebar-top"
            colorScheme="dark"
            visible
            position="fixed"
        >
            <CSidebarHeader className="border-bottom">
                <Link href="/" className="block">
                    <h1 className="fairwheels-logo">
                        <span className="fair">Fair</span>
                        <span className="wheels">Wheels</span>
                    </h1>
                </Link>
            </CSidebarHeader>

            <CSidebarNav>
                <CNavTitle>Dashboard</CNavTitle>
                <CNavItem>
                    <Link
                        href="/admin/dashboard/users"
                        className="nav-link flex items-center"
                    >
                        <CIcon
                            customClassName="nav-icon"
                            icon={cilSpeedometer}
                        />
                        <span className="ml-2">Manage Users</span>
                    </Link>
                </CNavItem>

                <CNavItem href="#">
                    <CIcon customClassName="nav-icon" icon={cilSpeedometer} />{" "}
                    Manage car listings
                </CNavItem>
                <CNavItem href="https://coreui.io">
                    <CIcon customClassName="nav-icon" icon={cilCloudDownload} />{" "}
                    Mangage Q&A Forum
                </CNavItem>
            </CSidebarNav>
        </CSidebar>
    );
};

export default SidebarExample;
