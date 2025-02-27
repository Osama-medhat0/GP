import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "@inertiajs/react";

export default function Header({ auth, laravelVersion, phpVersion }) {
    // console.log(auth);

    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Navbar
                className="sticky-top shadow-sm"
                bg="light"
                data-bs-theme="light"
            >
                <Container>
                    <Navbar.Brand
                        href="#home"
                        style={{ fontWeight: "bold", fontSize: 30 }}
                    >
                        <span style={{ color: "black" }}>Fair</span>
                        <span style={{ color: "#01D28E" }}>Wheels</span>
                    </Navbar.Brand>
                    <div className="ml-auto text-right">
                        <Nav className="me-auto">
                            <Nav.Link className="mr-5" href="#home">
                                Home
                            </Nav.Link>
                            <Nav.Link className="mr-5" href="#features">
                                Cars
                            </Nav.Link>
                            <Nav.Link className="mr-5" href="#pricing">
                                AI tool
                            </Nav.Link>
                            <Nav.Link className="mr-20" href="#pricing">
                                Cars
                            </Nav.Link>
                            {auth.user ? (
                                <Link
                                    href={
                                        auth.user.role === "admin"
                                            ? route("admin.dashboard")
                                            : route("dashboard")
                                    }
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </Nav>
                    </div>
                </Container>
            </Navbar>
        </>
    );
    // return (
    //     <div>
    //         {auth?.user ? (
    //             <h1>Welcome, {auth.user.name}!</h1>
    //         ) : (
    //             <h1>Welcome, Guest!</h1>
    //         )}
    //     </div>
    // );
}
