import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="transition duration-300 ease-in-out"
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        background: "#fff",
                        color: "grey",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        fontSize: "19px",
                        zIndex: 1000,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                    }}
                    onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "rgb(1, 210, 142)")
                    }
                    onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#fff")
                    }
                >
                    ↑
                </button>
            )}
        </div>
    );
};

export default ScrollToTopButton;
