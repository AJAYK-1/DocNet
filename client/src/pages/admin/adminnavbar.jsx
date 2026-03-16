import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    return (
        <>
            <Navbar expand={false} sticky="top" bg="dark" variant="dark" className="mb-3">
                <Container fluid>
                    <Navbar.Brand href="#" className="fw-bold text-light">DocNet</Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar-expand-false" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar-expand-false"
                        aria-labelledby="offcanvasNavbarLabel-expand-false"
                        placement="end"
                        className="bg-dark text-white"
                    >
                        <Offcanvas.Header closeButton className="bg-dark text-white">
                            <Offcanvas.Title id="offcanvasNavbarLabel-expand-false">
                                Dashboard
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="bg-dark text-white">
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/adminhome" className="text-white">Home</Nav.Link>
                                <Nav.Link href="/adminviewusers" className="text-white">Manage User</Nav.Link>
                                <Nav.Link href="/adminviewdoctors" className="text-white">Manage Doctor</Nav.Link>
                                <Nav.Link onClick={handleLogout}>
                                    <Button variant='outline-danger'>Logout</Button>
                                </Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}
