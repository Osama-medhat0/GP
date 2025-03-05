import Sidebar from "@/Pages/Frontend/Dashboard/Components/Sidebar";
import UsersTable from "@/Pages/Admin/UsersTable";
import "@coreui/coreui/dist/css/coreui.min.css";
import { Head, usePage } from "@inertiajs/react";

import { SidebarProvider } from "./Dashboard/Components/SidebarContext";
import DashboardLayout from "./Dashboard/DashboardLayout";

export default function Dashboard() {
    const { url } = usePage();

    return (
        <>
            <SidebarProvider>
                <DashboardLayout>
                    {/* <Header showLogo={false} /> */}
                    <div className="flex h-screen">
                        <Sidebar />
                        <Head title="Dashboard" />
                        <div className="container mx-auto">
                            {url === "/admin/dashboard/users" && <UsersTable />}
                        </div>
                    </div>
                </DashboardLayout>
            </SidebarProvider>
        </>
    );
}
