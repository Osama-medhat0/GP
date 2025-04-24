import MainLayout from "@/Layouts/MainLayout";
import { Link, usePage } from "@inertiajs/react";
import React from "react";

const Blog = () => {
    const { blogs } = usePage().props;
    console.log(blogs);
    return (
        <MainLayout>
            <section
                className="hero-wrap hero-wrap-2 js-fullheight"
                style={{
                    backgroundImage: 'url("assets/images/image_3.jpg")',
                }}
                data-stellar-background-ratio="0.5"
            >
                <div className="overlay" />
                <div className="container">
                    <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
                        <div className="col-md-9 ftco-animate pb-5">
                            <p className="breadcrumbs">
                                <span className="mr-2">
                                    <Link href="/">
                                        Home{" "}
                                        <i className="ion-ios-arrow-forward" />
                                    </Link>
                                </span>{" "}
                                <span>
                                    Blog <i className="ion-ios-arrow-forward" />
                                </span>
                            </p>
                            <h1 className="mb-3 bread">Our Blog</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ftco-section">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        {blogs.data.map((blog) => (
                            <div
                                key={blog.id}
                                className="col-md-12 text-center d-flex ftco-animate"
                            >
                                <div className="blog-entry justify-content-end mb-md-5">
                                    <Link
                                        href={route("blog.show", {
                                            slug: blog.slug,
                                        })}
                                        className="block-20 img"
                                        style={{
                                            backgroundImage: `url(${
                                                import.meta.env.VITE_APP_URL
                                            }/storage/${blog.image})`,
                                        }}
                                    ></Link>

                                    <div className="text px-md-5 pt-4">
                                        <div className="meta mb-3">
                                            <div>
                                                <Link
                                                    href={route("blog.show", {
                                                        slug: blog.slug,
                                                    })}
                                                >
                                                    {new Date(
                                                        blog.created_at
                                                    ).toLocaleDateString()}
                                                </Link>
                                            </div>
                                            <div>
                                                <Link
                                                    href={route("blog.show", {
                                                        slug: blog.slug,
                                                    })}
                                                >
                                                    Admin
                                                </Link>
                                            </div>
                                            <div>
                                                <Link
                                                    href={route("blog.show", {
                                                        slug: blog.slug,
                                                    })}
                                                    className="meta-chat"
                                                >
                                                    <span className="icon-chat" />{" "}
                                                    {blog.comments_count
                                                        ? blog.comments_count
                                                        : ""}
                                                    {console.log(blog)}
                                                </Link>
                                            </div>
                                        </div>
                                        <h3 className="heading mt-2">
                                            <Link href={`/blog/${blog.slug}`}>
                                                {" "}
                                                {/* Use the slug for the link */}
                                                {blog.title}
                                            </Link>
                                        </h3>
                                        <Link
                                            href={route("blog.show", {
                                                slug: blog.slug,
                                            })}
                                        >
                                            <p className="text-gray-400">
                                                {blog.content.substring(0, 150)}
                                                ...
                                            </p>{" "}
                                        </Link>
                                        {/* Show a snippet of the content */}
                                        <p>
                                            <Link
                                                href={`/blog/${blog.slug}`} // Using the slug for the URL
                                                className="btn btn-primary "
                                            >
                                                Continue{" "}
                                                <span className="icon-long-arrow-right mx-1" />
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Pagination */}
            <div
                className="flex justify-center pb-20"
                style={{ backgroundColor: "#f8f9fa" }}
            >
                {blogs.links.map((link) =>
                    link.url ? (
                        <Link
                            key={link.label}
                            href={link.url}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                            className={`p-1 px-3 mx-3 hover:bg-blue-200 transition duration-300 rounded ${
                                link.active
                                    ? "text-blue-500 font-bold w-xs"
                                    : " text-black"
                            }`}
                        />
                    ) : (
                        <span
                            key={link.label}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                            className="px-2 pt-1 text-slate-300"
                        ></span>
                    )
                )}
            </div>
        </MainLayout>
    );
};

export default Blog;
