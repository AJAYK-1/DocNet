import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function HomeNavbar() {

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} />

            <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#">DocNet</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">Home</Nav.Link>
                            <NavDropdown title="Account" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/login">SignIn</NavDropdown.Item>
                                <NavDropdown.Item href="/registration">
                                    Registration
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/about">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
