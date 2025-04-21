import { Link } from "@inertiajs/react";

export default function ApplicationLogo(props) {
    return (
        <Link
            href={route("home")}
            className="hidden sm:block pl-3"
            style={{
                fontWeight: "bold",
                fontSize: "40px",
                textDecoration: "none",
                fontFamily: "Poppins, sans-serif",
                display: "inline-block",
                marginRight: "145px",
                marginBottom: "0px",
            }}
            {...props}
        >
            <span style={{ color: "black" }}>Fair</span>
            <span style={{ color: "#01D28E" }}>Wheels</span>
        </Link>
    );
}
