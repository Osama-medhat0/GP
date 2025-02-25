import AuthenticatedLayout from "@/Layouts/UserAhuthenticated";
import Sidebar from "@/Pages/User/UserSidebar";
import { CSidebarHeader } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { Head } from "@inertiajs/react";
import "../../../css/app.css";
export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <div className="flex h-screen">
                <Sidebar />
                <div className="main-content flex-1 p-6 overflow-auto">
                    <Head title="Dashboard" />
                    Your List
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
