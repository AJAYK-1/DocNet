import { useGSAP } from '@gsap/react';
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { HomeNavbarAnimation } from './gsapAnimation';


export default function HomeNavbar() {

    

    useGSAP(() => {
        HomeNavbarAnimation()
    }, [])

    return (
        <>

            <Navbar expand="lg" sticky="top" className="navbar bg-body-tertiary" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#">DocNet</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link className='navbar-contents' href="/">Home</Nav.Link>
                            <Nav.Link className='navbar-contents' href="/login">SignIn</Nav.Link>
                            <Nav.Link className='navbar-contents' href="/about">About</Nav.Link>
                            <Nav.Link className='navbar-contents' href="/contact">Contact / Info</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
