import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import {useGSAP } from '@gsap/react'
import { HomeNavbarAnimation } from '../gsapAnimation';


export default function DoctorNavbar() {

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
                    <Navbar.Brand href="#">DocNet</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px', maxWidth: '100%' }}
                            navbarScroll
                        >
                            <Nav.Link className='navbar-contents' href="/doctorhome">Home</Nav.Link>
                            <NavDropdown className='navbar-contents' title="Appointments" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/viewappointment">New</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/appointmenthistory">
                                    History
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link className='navbar-contents' href="/viewprescription">Presciptions</Nav.Link>
                            <NavDropdown className='navbar-contents' title="Account" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/doctorprofile">My Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link className='navbar-contents' href="/doctorfeedback">See Feedbacks</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
