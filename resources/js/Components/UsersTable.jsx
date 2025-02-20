import { usePage, router } from "@inertiajs/react";

const UsersTable = () => {
    const { users } = usePage().props;
    console.log(users);
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
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border">ID</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4 border">{user.id}</td>
                            <td className="py-2 px-4 border">{user.name}</td>
                            <td className="py-2 px-4 border">{user.email}</td>
                            <td className="py-2 px-4 border">
                                <button
                                    onClick={() => handleDelete(user.id)}
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
    );
};

export default UsersTable;
