import React from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


export default function UserNavbar() {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <Navbar expand="lg" sticky="top" className="bg-body-tertiary" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#">DocNet</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/userhome">Home</Nav.Link>
                            <Nav.Link href="/appointment">My Appointments</Nav.Link>
                            <Nav.Link href="/getprescription">Presciptions</Nav.Link>
                            <NavDropdown title="Account" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/userprofile">My Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
