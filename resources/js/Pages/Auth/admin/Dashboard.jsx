import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/AdminSidebar";
import UsersTable from "@/Components/UsersTable";
import { CSidebarHeader } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { Head, usePage } from "@inertiajs/react";
import "../../../../css/app.css";

export default function Dashboard() {
    const { url } = usePage();
    return (
        <AuthenticatedLayout>
            <div className="flex h-screen">
                <Sidebar />
                <div className="main-content flex-1 p-6 overflow-auto ml-[250px]">
                    <Head title="Admin Dashboard" />
                    <div className="py-12">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                {url === "/admin/dashboard/users" && (
                                    <UsersTable />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
