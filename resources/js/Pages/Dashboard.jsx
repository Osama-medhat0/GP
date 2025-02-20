import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/AdminSidebar";
import { CSidebarHeader } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { Head } from "@inertiajs/react";
import "../../css/app.css";
export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <div className="flex h-screen">
                <Sidebar />
                <div className="main-content flex-1 p-6 overflow-auto">
                    <Head title="Dashboard" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
