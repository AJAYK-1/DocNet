import React, { useState, useEffect, useMemo } from 'react';
import AXIOS from 'axios';
import { jwtDecode } from 'jwt-decode';
import UserNavbar from './usernavbar';
import Footer from '../footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function UserProfile() {
    const decoded = useMemo(() => {
        const token = localStorage.getItem('token');
        return jwtDecode(token);
    }, [])

    const [UserData, setUserData] = useState({
        username: '',
        email: ''
    });

    useEffect(() => {
        AXIOS.get(`${import.meta.env.VITE_HOST_URL}/api/user/viewloggeduser`, {
            headers: { id: decoded.id }
        })
            .then((res) => {
                setUserData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const navigate = useNavigate()

    const handleLogout = (e) => {
        localStorage.removeItem('token')
        navigate("/login")
    }

    return (
        <>
            <UserNavbar />
            <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
                <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '500px' }}>
                    <div className="text-center mb-4">
                        <h2 className="text-primary">Your Profile</h2>
                        <p className="text-muted">View your personal information</p>
                    </div>
                    <div className="mb-3">
                        <h5 className="mb-1 text-secondary">Name</h5>
                        <p className="fs-5">{UserData.username}</p>
                    </div>
                    <div>
                        <h5 className="mb-1 text-secondary">Email</h5>
                        <p className="fs-5">{UserData.email}</p>
                    </div>
                    <div className="d-flex gap-3 justify-content-center mt-3">
                        <Button variant="outline-danger" size="md" style={{ fontWeight: '600' }} onClick={handleLogout}>
                            📤 Logout
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
