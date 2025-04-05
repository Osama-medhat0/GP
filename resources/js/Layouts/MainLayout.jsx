import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "../Pages/Frontend/Components/Footer";
import Header from "../Pages/Frontend/Components/Header";
import { usePage } from "@inertiajs/react";
import { SidebarProvider } from "@/Pages/Frontend/Dashboard/Components/SidebarContext";
import ScrollToTopButton from "@/Components/ScrollToTopButton";
import Loader from "@/Components/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = ({ children }) => {
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash?.message) {
            toast[flash?.type || "success"](flash.message);
        }
    }, [flash]);
    console.log("Flash:", flash);

    useEffect(() => {
        const loadScript = (src) => {
            if (document.querySelector(`script[src="${src}"]`)) return; // Avoid loading the same script twice
            const script = document.createElement("script");
            script.src = src;
            script.async = false; // Ensures scripts execute in order
            document.body.appendChild(script);
        };

        const scripts = [
            "/assets/js/jquery.min.js",
            "/assets/js/jquery-migrate-3.0.1.min.js",
            "/assets/js/popper.min.js",
            "/assets/js/bootstrap.min.js",
            "/assets/js/jquery.easing.1.3.js",
            "/assets/js/jquery.waypoints.min.js",
            "/assets/js/jquery.stellar.min.js",
            "/assets/js/owl.carousel.min.js",
            "/assets/js/jquery.magnific-popup.min.js",
            "/assets/js/aos.js",
            "/assets/js/jquery.animateNumber.min.js",
            "/assets/js/bootstrap-datepicker.js",
            "/assets/js/jquery.timepicker.min.js",
            "/assets/js/scrollax.min.js",
            "/assets/js/main.js",
        ];

        scripts.forEach(loadScript);

        return () => {
            scripts.forEach((src) => {
                const script = document.querySelector(`script[src="${src}"]`);
                if (script) document.body.removeChild(script);
            });
        };
    }, []);

    return (
        <SidebarProvider>
            <HelmetProvider>
                <Helmet>
                    {/* Meta Tags */}
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    {/* Title */}
                    <title>FairWheels</title>

                    {/* Fonts */}
                    <link
                        href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800&display=swap"
                        rel="stylesheet"
                    />

                    {/* Css */}
                    <link
                        rel="stylesheet"
                        href="/assets/css/open-iconic-bootstrap.min.css"
                    />
                    <link rel="stylesheet" href="/assets/css/animate.css" />
                    <link
                        rel="stylesheet"
                        href="/assets/css/owl.carousel.min.css"
                    />
                    <link
                        rel="stylesheet"
                        href="/assets/css/owl.theme.default.min.css"
                    />
                    <link
                        rel="stylesheet"
                        href="/assets/css/magnific-popup.css"
                    />
                    <link rel="stylesheet" href="/assets/css/aos.css" />
                    <link
                        rel="stylesheet"
                        href="/assets/css/ionicons.min.css"
                    />
                    <link
                        rel="stylesheet"
                        href="/assets/css/bootstrap-datepicker.css"
                    />
                    <link
                        rel="stylesheet"
                        href="/assets/css/jquery.timepicker.css"
                    />
                    <link rel="stylesheet" href="/assets/css/flaticon.css" />
                    <link rel="stylesheet" href="/assets/css/icomoon.css" />
                    <link rel="stylesheet" href="/assets/css/style.css" />
                </Helmet>

                <Header auth={usePage().props.auth} />

                <ScrollToTopButton />
                <Loader delay={1500}>
                    {/* Page Content */}
                    <div>{children}</div>
                    {/* Toast container for showing flash messages */}
                    <ToastContainer position="top-right" autoClose={3000} />
                    <Footer />
                </Loader>
            </HelmetProvider>
        </SidebarProvider>
    );
};
export default MainLayout;
