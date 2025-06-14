import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomeNavbarAnimation } from './gsapAnimation';


export default function HomeNavbar() {

    const homeNavRef = useRef()
    const navElementsRef = useRef([])
    navElementsRef.current = []

    useGSAP(() => {
        HomeNavbarAnimation({ homeNavRef, navElementsRef })
    },[])

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} />

            <Navbar ref={homeNavRef} expand="lg" sticky="top" className="bg-body-tertiary" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#">DocNet</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link ref={(ob)=>ob && navElementsRef.current.push(ob)} href="/">Home</Nav.Link>
                            <NavDropdown ref={(ob)=>ob && navElementsRef.current.push(ob)} title="Account" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/login">SignIn</NavDropdown.Item>
                                <NavDropdown.Item href="/registration">
                                    Registration
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link ref={(ob)=>ob && navElementsRef.current.push(ob)} href="/about">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
