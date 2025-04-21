import MainLayout from "@/Layouts/MainLayout";
import { CAlert } from "@coreui/react";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";

const contactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("contact.store"), formData, {
            preserveScroll: true,
            onSuccess: () => {
                setErrors({});
            },
            onError: (errors) => {
                setErrors(errors);
                toast.warn("Please fill in all required fields!");
            },
        });
    };

    return (
        <>
            <MainLayout>
                <section
                    className="hero-wrap hero-wrap-2 js-fullheight"
                    style={{
                        backgroundImage: 'url("assets/images/supra.jpg")',
                    }}
                    data-stellar-background-ratio="0.5"
                >
                    <div className="overlay" />
                    <div className="container">
                        <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
                            <div className="col-md-9 ftco-animate pb-5">
                                <p className="breadcrumbs">
                                    <span className="mr-2">
                                        <a href="index.html">
                                            Home{" "}
                                            <i className="ion-ios-arrow-forward" />
                                        </a>
                                    </span>{" "}
                                    <span>
                                        Contact{" "}
                                        <i className="ion-ios-arrow-forward" />
                                    </span>
                                </p>
                                <h1 className="mb-3 bread">Contact Us</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-section contact-section">
                    <div className="container">
                        <div className="row d-flex mb-5 contact-info">
                            <div className="col-md-4">
                                <div className="row mb-5">
                                    <div className="col-md-12">
                                        <div className="border w-100 p-4 rounded mb-2 d-flex">
                                            <div className="icon mr-3">
                                                <span className="icon-map-o" />
                                            </div>
                                            <p>
                                                <span>Address:</span> 198 Cairo
                                                7th district, Shrouk
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="border w-100 p-4 rounded mb-2 d-flex">
                                            <div className="icon mr-3">
                                                <span className="icon-mobile-phone" />
                                            </div>
                                            <p>
                                                <span>Phone:</span>{" "}
                                                <a href="tel://1234567920">
                                                    01553511607
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="border w-100 p-4 rounded mb-2 d-flex">
                                            <div className="icon mr-3">
                                                <span className="icon-envelope-o" />
                                            </div>
                                            <p>
                                                <span>Email:</span>{" "}
                                                <a href="mailto:FairWheels@gmail.com">
                                                    info@FairWheels.com
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 block-9 mb-md-5">
                                <form
                                    onSubmit={handleSubmit}
                                    className="bg-light p-5 contact-form"
                                >
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            placeholder="Your Email"
                                        />
                                    </div>
                                    {errors.email && (
                                        <CAlert color="danger">
                                            {errors.email}
                                        </CAlert>
                                    )}
                                    <div className="form-group">
                                        <input
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            placeholder="Subject"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            name="message"
                                            onChange={handleChange}
                                            value={formData.message}
                                            id
                                            cols={30}
                                            rows={7}
                                            className="form-control"
                                            placeholder="Message"
                                            defaultValue={""}
                                        />
                                    </div>
                                    <div className="form-group mt-9">
                                        <input
                                            type="submit"
                                            defaultValue="Send Message"
                                            className=" active w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-500 transition duration-300"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div id="map" className="bg-white" />
                            </div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </>
    );
};
export default contactUs;
