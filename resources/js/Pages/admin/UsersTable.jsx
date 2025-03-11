import { usePage, router, Link } from "@inertiajs/react";
import { SidebarProvider } from "../Frontend/Dashboard/Components/SidebarContext";
import DashboardLayout from "../Frontend/Dashboard/DashboardLayout";

const UsersTable = () => {
    const { users } = usePage().props;
    const filteredUsers =
        users?.data.filter((user) => user.role === "user") || [];

    const handleDelete = (userId) => {
        if (confirm("Are you sure you want to delete this user?")) {
            router.delete(route("admin.users.delete", userId), {
                preserveScroll: true,
                onSuccess: () => alert("User deleted successfully!"),
                onError: () => alert("Error deleting user:" + error),
            });
        }
    };

    return (
        <SidebarProvider>
            <DashboardLayout>
                <div className="pt-4 pl-0 flex justify-center items-start min-h-screen">
                    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-3xl">
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            User List
                        </h2>
                        <div className="overflow-x-auto w-full">
                            <div className="inline-block min-w-full">
                                <table className="min-w-full w-full table-auto bg-white border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-2 px-4 border text-left">
                                                ID
                                            </th>
                                            <th className="py-2 px-4 border text-left">
                                                Name
                                            </th>
                                            <th className="py-2 px-4 border text-left">
                                                Email
                                            </th>
                                            <th className="py-2 px-4 border text-left">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="border-b hover:bg-gray-50"
                                            >
                                                <td className="py-2 px-4 border">
                                                    {user.id}
                                                </td>
                                                <td className="py-2 px-4 border truncate max-w-[150px]">
                                                    {user.name}
                                                </td>
                                                <td className="py-2 px-4 border truncate max-w-[200px]">
                                                    {user.email}
                                                </td>
                                                <td className="py-2 px-4 border">
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                user.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            {console.log(users.links)}
                            <div className="flex justify-end pt-3 ">
                                {users.links.map((link) =>
                                    link.url ? (
                                        <Link
                                            key={link.label}
                                            href={link.url}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            className={`p-1 mx-1 hover:bg-blue-200 transition duration-300 rounded ${
                                                link.active
                                                    ? "text-blue-500 font-bold w-xs"
                                                    : "text-black"
                                            }`}
                                        />
                                    ) : (
                                        <span
                                            key={link.label}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            className="p-2 mx-1 text-slate-300"
                                        ></span>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </SidebarProvider>
    );
};

export default UsersTable;
