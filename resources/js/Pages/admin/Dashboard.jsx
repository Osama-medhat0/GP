import AuthenticatedLayout from "@/Layouts/Authenticated";
import Sidebar from "@/Pages/Frontend/Components/Sidebar";
import UsersTable from "@/Pages/Admin/UsersTable";
import "@coreui/coreui/dist/css/coreui.min.css";
import { Head, usePage } from "@inertiajs/react";
import "../../../css/app.css";

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
