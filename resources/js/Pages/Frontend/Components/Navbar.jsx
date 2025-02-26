import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function ColorSchemesExample() {
    return (
        <>
            <Navbar
                className="sticky-top shadow-sm"
                bg="light"
                data-bs-theme="light"
            >
                <Container>
                    <Navbar.Brand href="#home" style={{ fontWeight: "bold" }}>
                        <span style={{ color: "black" }}>Fair</span>
                        <span style={{ color: "#01D28E" }}>Wheels</span>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <Nav.Link href="#pricing">Cars</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default ColorSchemesExample;
