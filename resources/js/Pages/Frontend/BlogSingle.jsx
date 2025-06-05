import MainLayout from "@/Layouts/MainLayout";
import { Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";

const Comment = ({ comment }) => {
    console.log(comment);

    return (
        <li className="comment">
            <div className="vcard bio">
                <img
                    className=" pb-1 w-12 h-12"
                    src="/profile.svg"
                    alt="User avatar"
                />
            </div>
            <div className="comment-body">
                <h3>{comment.user?.name ?? "Anonymous"}</h3>
                <div className="meta">
                    {new Date(comment.created_at).toLocaleString()}
                </div>
                <p>{comment.body}</p>
                {/* <p>
                    <a href="#" className="reply">
                        Reply
                    </a>
                </p> */}
            </div>
            {comment.children && comment.children.length > 0 && (
                <ul className="children">
                    {comment.children.map((child) => (
                        <Comment key={child.id} comment={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};

const BlogSingle = () => {
    const { blog, blogs } = usePage().props;
    const { user } = usePage().props;
    console.log(user);
    const comments = blog.comments || [];

    const [comment, setComment] = useState("");

    // console.log(blog);
    // console.log(blogs);
    console.log(comments);

    const submitComment = () => {
        router.post(
            `/blog/${blog.id}/comments`,
            { body: comment },
            { onSuccess: () => setComment("") }
        );
    };
    return (
        <>
            <MainLayout>
                <section
                    className="hero-wrap hero-wrap-2 js-fullheight"
                    style={{
                        backgroundImage: `url("/storage/${blog.image}")`,
                    }}
                    data-stellar-background-ratio="0.5"
                >
                    <div className="overlay" />
                    <div className="container">
                        <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
                            <div className="col-md-9 ftco-animate pb-5">
                                <p className="breadcrumbs">
                                    <span className="mr-2">
                                        <Link href={route("home")}>
                                            Home{" "}
                                            <i className="ion-ios-arrow-forward" />
                                        </Link>
                                    </span>
                                    <span className="mr-2">
                                        <Link href={route("blog")}>
                                            Blog{" "}
                                            <i className="ion-ios-arrow-forward" />
                                        </Link>
                                    </span>
                                    <span>
                                        Blog Single{" "}
                                        <i className="ion-ios-arrow-forward" />
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-section ftco-degree-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 ftco-animate">
                                <h2 className="mb-3">{blog.title}</h2>
                                <p>{blog.content}</p>

                                <div className="about-author d-flex px-0 mx-0 ">
                                    <div className="desc">
                                        <h3 className="">
                                            Posted by {blog.user?.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="pt-5 mt-5">
                                    <h3 className="mb-5">
                                        {blog.comments &&
                                            blog.comments.length > 0 && (
                                                <>
                                                    {blog.comments.length}{" "}
                                                    <span className="ml-2">
                                                        Comments
                                                    </span>
                                                </>
                                            )}
                                    </h3>
                                    <ul className="comment-list">
                                        {comments.map((comment) => (
                                            <Comment
                                                key={comment.id}
                                                comment={comment}
                                            />
                                        ))}
                                    </ul>
                                    {/* END comment-list */}
                                    <div className="comment-form-wrap pt-5">
                                        <h3 className="mb-5">
                                            Leave a comment
                                        </h3>
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                submitComment();
                                            }}
                                            className="p-5 bg-light"
                                        >
                                            <div className="form-group">
                                                <label htmlFor="message">
                                                    Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    cols={30}
                                                    rows={10}
                                                    className="form-control"
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="submit"
                                                    defaultValue="Post Comment"
                                                    className="btn py-3 px-4 btn-primary"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>{" "}
                            {/* Search box */}
                            <div className="col-md-4 sidebar ftco-animate pt-3">
                                <div className="sidebar-box">
                                    <form action="#" className="search-form">
                                        <div className="form-group">
                                            <span className="icon icon-search" />
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Type a keyword"
                                            />
                                        </div>
                                    </form>
                                </div>
                                {/* Recent Blogs*/}
                                <div className="sidebar-box ftco-animate pb-2">
                                    <h4>Recent Blogs</h4>
                                    {blogs.map((blog) => {
                                        return (
                                            <div
                                                className="block-21 mb-4 d-flex "
                                                key={blog.id}
                                            >
                                                <Link
                                                    href={route(
                                                        "blog.show",
                                                        blog.slug
                                                    )}
                                                    className="blog-img mr-4"
                                                    style={{
                                                        backgroundImage: `url("/storage/${blog.image}")`,
                                                    }}
                                                />
                                                <div className="text">
                                                    <h3 className="heading">
                                                        <Link
                                                            href={route(
                                                                "blog.show",
                                                                blog.slug
                                                            )}
                                                        >
                                                            {blog.title}
                                                        </Link>
                                                    </h3>
                                                    <div className="meta">
                                                        <div>
                                                            <Link
                                                                href={route(
                                                                    "blog.show",
                                                                    blog.slug
                                                                )}
                                                            >
                                                                <span className="icon-calendar" />{" "}
                                                                {new Date(
                                                                    blog.updated_at
                                                                )
                                                                    .toLocaleDateString(
                                                                        "en-US",
                                                                        {
                                                                            year: "numeric",
                                                                            month: "short",
                                                                            day: "2-digit",
                                                                        }
                                                                    )
                                                                    .replace(
                                                                        /^(\w{3})/,
                                                                        "$1."
                                                                    )}{" "}
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Link
                                                                href={route(
                                                                    "blog.show",
                                                                    blog.slug
                                                                )}
                                                            >
                                                                <span className="icon-chat" />{" "}
                                                                {blog.comments_count ??
                                                                    0}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>{" "}
                {/* .section */}
            </MainLayout>
            ;
        </>
    );
};
export default BlogSingle;
