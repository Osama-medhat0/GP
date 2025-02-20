import React from "react";
import {
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
    CSidebarNav,
    CSidebarToggler,
    CNavGroup,
    CNavItem,
    CNavTitle,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import {
    cilCloudDownload,
    cilLayers,
    cilPuzzle,
    cilSpeedometer,
    cilUser,
} from "@coreui/icons";

export const SidebarExample = () => {
    return (
        <CSidebar className="sidebar" style={{ height: "100vh" }}>
            <CSidebarHeader className="sidebar-header">
                <CSidebarBrand>Dashboard</CSidebarBrand>
            </CSidebarHeader>
            <CSidebarNav className="sidebar-nav">
                <CNavTitle>Navigation</CNavTitle>
                <CNavItem href="#" className="sidebar-item">
                    <CIcon customClassName="nav-icon" icon={cilUser} /> Manage
                    Users
                </CNavItem>
                <CNavItem href="#" className="sidebar-item">
                    <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
                    With badge{" "}
                    <span className="ml-auto bg-blue-500 text-white px-2 py-1 rounded">
                        NEW
                    </span>
                </CNavItem>
                <CNavGroup
                    toggler={
                        <>
                            <CIcon
                                customClassName="nav-icon"
                                icon={cilPuzzle}
                            />{" "}
                            Dropdown
                        </>
                    }
                >
                    <CNavItem href="#" className="sidebar-item">
                        Dropdown Item 1
                    </CNavItem>
                    <CNavItem href="#" className="sidebar-item">
                        Dropdown Item 2
                    </CNavItem>
                </CNavGroup>
                <CNavItem
                    href="https://coreui.io/pro/"
                    className="sidebar-item"
                >
                    <CIcon customClassName="nav-icon" icon={cilLayers} /> Try
                    CoreUI PRO
                </CNavItem>
            </CSidebarNav>
            <CSidebarHeader className="sidebar-footer">
                <CSidebarToggler />
            </CSidebarHeader>
        </CSidebar>
    );
};

export default SidebarExample;
