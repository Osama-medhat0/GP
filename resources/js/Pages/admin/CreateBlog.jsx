import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { SidebarProvider } from "../Frontend/Dashboard/Components/SidebarContext";
import DashboardLayout from "../Frontend/Dashboard/DashboardLayout";

export default function CreateBlog({ blog = null }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: blog?.title || "",
        slug: blog?.slug || "",
        content: blog?.content || "",
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (blog) {
            post(route("blog.update", blog.id));
        } else {
            post(route("blog.store"));
        }
    };

    useEffect(() => {
        if (data.title && !blog) {
            setData("slug", data.title.toLowerCase().replace(/\s+/g, "-"));
        }
    }, [data.title]);

    return (
        <SidebarProvider>
            <DashboardLayout>
                <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
                    <h1 className="text-2xl font-bold mb-6 text-center">
                        {blog ? "Edit Blog" : "Create New Blog"}
                    </h1>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label className="block text-gray-700">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full border p-2 rounded"
                            />
                            {errors.title && (
                                <div className="text-red-500">
                                    {errors.title}
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Content
                            </label>
                            <textarea
                                value={data.content}
                                onChange={(e) =>
                                    setData("content", e.target.value)
                                }
                                className="w-full border p-2 rounded h-40"
                            ></textarea>
                            {errors.content && (
                                <div className="text-red-500">
                                    {errors.content}
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700">Image</label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setData("image", e.target.files[0])
                                }
                                className="w-full"
                            />
                            {errors.image && (
                                <div className="text-red-500">
                                    {errors.image}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
                        >
                            {blog ? "Update Blog" : "Publish Blog"}
                        </button>
                    </form>
                </div>
            </DashboardLayout>
        </SidebarProvider>
    );
}
