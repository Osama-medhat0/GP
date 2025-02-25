import AuthenticatedLayout from "@/Layouts/AdminAuthenticated";
import Sidebar from "@/Pages/Admin/AdminSidebar";
import UsersTable from "@/Components/UsersTable";
import { CSidebarHeader } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { Head, usePage } from "@inertiajs/react";
import "../../../css/app.css";
import { useState, useEffect } from "react";

export default function Dashboard() {
    const { url } = usePage();

    return (
        <AuthenticatedLayout>
            <div className="flex h-screen">
                <Sidebar />
                <Head title="Admin Dashboard" />
                <div className="container mx-auto">
                    {url === "/admin/dashboard/users" && <UsersTable />}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
