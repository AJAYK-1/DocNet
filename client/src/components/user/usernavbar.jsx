import { useGSAP } from '@gsap/react';
import React from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { HomeNavbarAnimation } from '../gsapAnimation';


export default function UserNavbar() {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }

    useGSAP(() => {
        HomeNavbarAnimation()
    })
    return (
        <>
            <Navbar expand="lg" sticky="top" className="bg-body-tertiary" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="/userhome">DocNet</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link className='navbar-contents' href="/userhome">Home</Nav.Link>
                            <Nav.Link className='navbar-contents' href="/seealldoctors">Find Doctors</Nav.Link>
                            <Nav.Link className='navbar-contents' href="/appointment">My Appointments</Nav.Link>
                            <Nav.Link className='navbar-contents' href="/getprescription">Presciptions</Nav.Link>
                            <NavDropdown className='navbar-contents' title="Account" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/userprofile">My Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link className='navbar-contents' href="/userfeedback">Feedbacks</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
