import { usePage, router } from "@inertiajs/react";

const UsersTable = () => {
    const { users } = usePage().props;
    const filteredUsers = users?.filter((user) => user.role === "user") || [];

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
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">User List</h2>
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
                                                handleDelete(user.id)
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
        </div>
    );
};

export default UsersTable;
