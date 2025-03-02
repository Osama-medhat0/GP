import AuthenticatedLayout from "@/Layouts/Authenticated";
import Sidebar from "@/Pages/Frontend/Dashboard/Components/Sidebar";
import "@coreui/coreui/dist/css/coreui.min.css";
import { Head } from "@inertiajs/react";
import "../../../css/app.css";
import Header from "../Frontend/Components/Header";
export default function Dashboard() {
    return (
        <>
            <Header showLogo={true} />
            <div className="flex h-screen">
                <Sidebar />
                <div className="main-content flex-1 p-6 overflow-auto">
                    <Head title="Dashboard" />
                    Your List
                </div>
            </div>
        </>
    );
}
