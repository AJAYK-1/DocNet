import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './adminnavbar';
import Footer from '../../components/layouts/footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function AdminViewDoctors() {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('token')

    const fetchDoctors = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/admin/view-doctors`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (res.status === 200) {
                setDoctors(res.data.data)
            } else {
                toast.error(res.data.msg)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong...')
        }
    }

    useEffect(() => {
        fetchDoctors()
    }, []);

    const handleAction = async (id, accountStatus) => {
        try {
            const doctorStatusChange = accountStatus === "Active" ? "Deactivated" : "Active";
            const res = await axios.put(`${import.meta.env.VITE_HOST_URL}/api/admin/action-on-doctor`,
                { id, doctorStatusChange },
                { headers: { Authorization: `Bearer ${token}` } })
            if (res.status === 200) {
                window.location.reload()
            } else {
                toast.error(res.data.msg)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong...')
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm) ||
        doctor.specialization.toLowerCase().includes(searchTerm) ||
        doctor.email.toLowerCase().includes(searchTerm)
    );

    return (
        <>
            <AdminNavbar />
            <div className="container mt-5 mb-5" style={{ minHeight: '500px' }}>
                <h2 className="text-center text-primary mb-4">Registered Doctors</h2>

                <Form.Control
                    type="text"
                    placeholder="Search by name, specialization, or email..."
                    className="mb-3"
                    style={{ borderRadius: '20px', background: 'linear-gradient(170deg,rgb(244, 244, 244),rgb(152, 255, 245))' }}
                    onChange={handleSearchChange}
                />

                <div className="table-responsive shadow p-3 bg-white rounded">
                    <table className="table table-bordered table-hover align-middle text-center">
                        <thead className="table-primary">
                            <tr>
                                <th>Doctor Name</th>
                                <th>Profile Photo</th>
                                <th>License</th>
                                <th>Qualification</th>
                                <th>Specialization</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Doctor Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDoctors.map((doctor) => (
                                <tr key={doctor._id}>
                                    <td>{doctor.name}</td>
                                    <td>
                                        <img
                                            src={`${import.meta.env.VITE_HOST_URL}/uploads/${doctor.profileImage}`}
                                            alt="Profile"
                                            className="img-thumbnail"
                                            style={{ width: '100px', height: '120px', objectFit: 'cover' }}
                                        />
                                    </td>
                                    <td>{doctor.license}</td>
                                    <td>{doctor.qualification}</td>
                                    <td>{doctor.specialization}</td>
                                    <td>{doctor.address}</td>
                                    <td>{doctor.email}</td>
                                    <td>
                                        <span className={`badge ${doctor.accountStatus == 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                            {doctor.accountStatus == "Active" ? 'Active' : 'Deactivated'}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <Button
                                            className="btn btn-sm"
                                            variant={doctor.accountStatus === "Active" ? "danger" : "success"}
                                            onClick={() => handleAction(doctor._id, doctor.accountStatus)}
                                        >
                                            {doctor.accountStatus === "Active" ? "Deactivate" : "Activate"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}
