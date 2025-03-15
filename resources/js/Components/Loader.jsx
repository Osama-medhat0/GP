import { useEffect, useState } from "react";

const Loader = ({ delay = 1000, children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, delay);

        return () => clearTimeout(timer); // Cleanup
    }, [delay]);

    return loading ? (
        <div id="ftco-loader" className="show fullscreen">
            <svg className="circular" width="48px" height="48px">
                <circle
                    className="path-bg"
                    cx={24}
                    cy={24}
                    r={22}
                    fill="none"
                    strokeWidth={4}
                    stroke="#eeeeee"
                />
                <circle
                    className="path"
                    cx={24}
                    cy={24}
                    r={22}
                    fill="none"
                    strokeWidth={4}
                    strokeMiterlimit={10}
                    stroke="#01D28E"
                />
            </svg>
        </div>
    ) : (
        children
    );
};

export default Loader;
