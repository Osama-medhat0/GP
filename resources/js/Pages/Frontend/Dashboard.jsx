import Sidebar from "@/Pages/Frontend/Dashboard/Components/Sidebar";
import "@coreui/coreui/dist/css/coreui.min.css";
import { Head } from "@inertiajs/react";
import { SidebarProvider } from "./Dashboard/Components/SidebarContext";
import DashboardLayout from "./Dashboard/DashboardLayout";

export default function Dashboard() {
    return (
        <>
            <SidebarProvider>
                <DashboardLayout>
                    {/* <Header showLogo={false} /> */}
                    <div className="flex h-screen">
                        <Sidebar />
                        <Head title="Dashboard" />
                        <div className="container mx-auto"></div>
                    </div>
                </DashboardLayout>
            </SidebarProvider>
        </>
    );
}
