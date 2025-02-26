import { useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Navbar from "./Navbar";

const MainLayout = () => {
    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = src;
                script.async = false; // Important: Ensures scripts load in order
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        const loadScripts = async () => {
            try {
                // Load critical scripts first in order
                await loadScript("assets/js/jquery.min.js");
                await loadScript("assets/js/jquery-migrate-3.0.1.min.js");
                await loadScript("assets/js/popper.min.js");
                await loadScript("assets/js/bootstrap.min.js");

                // Now load the rest
                const otherScripts = [
                    "assets/js/jquery.easing.1.3.js",
                    "assets/js/jquery.waypoints.min.js",
                    "assets/js/jquery.stellar.min.js",
                    "assets/js/owl.carousel.min.js",
                    "assets/js/jquery.magnific-popup.min.js",
                    "assets/js/aos.js",
                    "assets/js/jquery.animateNumber.min.js",
                    "assets/js/bootstrap-datepicker.js",
                    "assets/js/jquery.timepicker.min.js",
                    "assets/js/scrollax.min.js",
                    "https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false",
                    "assets/js/google-map.js",
                    "assets/js/main.js",
                ];

                for (const src of otherScripts) {
                    await loadScript(src);
                }
            } catch (error) {
                console.error("Script loading failed:", error);
            }
        };

        loadScripts();

        return () => {
            const scripts = document.querySelectorAll("script[src]");
            scripts.forEach((script) => document.body.removeChild(script));
        };
    }, []);

    return (
        <div>
            <Header />
            <Navbar />
            <Home />
        </div>
    );
};

export default MainLayout;
