import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Sidebar from "./Components/Sidebar";
import { SidebarProvider } from "./Components/SidebarContext";
import Header from "../Components/Header";

const DashboardLayout = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer); // Cleanup
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <HelmetProvider>
            <Helmet>
                <meta
                    httpEquiv="content-type"
                    content="text/html; charset=utf-8"
                />
                <meta name="author" content="TechyDevs" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <title>FairWheels</title>
                {/* Google fonts */}
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
                {/* Logo */}

                {/* inject:css */}
                <link
                    rel="stylesheet"
                    href="/assets/css/dashboardTemplateCss/bootstrap.min.css"
                />
                <link
                    rel="stylesheet"
                    href="/assets/css/dashboardTemplateCss/line-awesome.css"
                />
                <link
                    rel="stylesheet"
                    href="/assets/css/dashboardTemplateCss/owl.carousel.min.css"
                />
                <link
                    rel="stylesheet"
                    href="/assets/css/dashboardTemplateCss/owl.theme.default.min.css"
                />
                <link
                    rel="stylesheet"
                    href="/assets/css/dashboardTemplateCss/bootstrap-select.min.css"
                />
                <link
                    rel="stylesheet"
                    href="/assets/css/dashboardTemplateCss/fancybox.css"
                />
                <link
                    rel="stylesheet"
                    href="/assets/css/dashboardTemplateCss/style.css"
                />
            </Helmet>

            {/* Preloader */}
            {loading && (
                <div className="preloader">
                    <div className="loader">
                        <svg className="spinner" viewBox="0 0 50 50">
                            <circle
                                className="path"
                                cx={25}
                                cy={25}
                                r={20}
                                fill="none"
                                strokeWidth={5}
                            />
                        </svg>
                    </div>
                </div>
            )}

            {/* Page Content */}
            {!loading && (
                <>
                    <SidebarProvider>
                        <Header showLogo={true} />
                        <section className="dashboard-area">
                            <Sidebar />
                            <div>{children}</div>
                        </section>
                    </SidebarProvider>

                    <div onClick={scrollToTop} id="scroll-top">
                        <i className="la la-arrow-up" title="Go top" />
                    </div>
                </>
            )}
        </HelmetProvider>
    );
};

export default DashboardLayout;
