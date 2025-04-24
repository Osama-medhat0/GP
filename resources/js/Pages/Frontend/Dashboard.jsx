import Sidebar from "@/Pages/Frontend/Dashboard/Components/Sidebar";
import "@coreui/coreui/dist/css/coreui.min.css";
import { Head } from "@inertiajs/react";
import { SidebarProvider } from "./Dashboard/Components/SidebarContext";
import DashboardLayout from "./Dashboard/DashboardLayout";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia"; // ✅ Correct import

export default function Dashboard() {
    const { notifications = [] } = usePage().props;
    console.log(notifications);

    const extractSenderFromMessage = (message) => {
        const match = message.match(/from\s(.+)$/i);
        return match ? match[1] : "Unknown";
    };

    const senderCounts = notifications.reduce((acc, curr) => {
        const message = curr.data.message;
        const sender = extractSenderFromMessage(message);
        acc[sender] = (acc[sender] || 0) + 1;
        return acc;
    }, {});

    return (
        <>
            <SidebarProvider>
                <DashboardLayout>
                    <div className="max-w-2xl mx-auto p-6  rounded-xl  space-y-4 ml-10">
                        {" "}
                        {/* Sidebar */}
                        <Sidebar />
                        {/* Main content container */}
                        <div className="flex-grow  py-6 px-4">
                            <Head title="Dashboard" />

                            {notifications.length > 0 ? (
                                <div className="bg-white shadow rounded p-10 mb-6">
                                    <h2 className="text-lg font-semibold mb-3">
                                        🔔 Notifications
                                    </h2>
                                    <ul className="space-y-2">
                                        {Object.entries(senderCounts).map(
                                            ([sender, count], index) => (
                                                <li
                                                    key={index}
                                                    className="border-b pb-2"
                                                >
                                                    You have {count} new message
                                                    {count > 1
                                                        ? "s"
                                                        : ""} from{" "}
                                                    <strong>{sender}</strong>
                                                </li>
                                            )
                                        )}
                                    </ul>

                                    <button
                                        onClick={() =>
                                            Inertia.post(
                                                route("notifications.read")
                                            )
                                        }
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Mark all as read
                                    </button>
                                </div>
                            ) : (
                                <p className="text-gray-500"></p>
                            )}
                        </div>
                    </div>
                </DashboardLayout>
            </SidebarProvider>
        </>
    );
}
