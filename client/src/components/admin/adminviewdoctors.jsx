import React, { useEffect, useState } from 'react';
import AXIOS from 'axios';
import AdminNavbar from './adminnavbar';
import Footer from '../footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';

export default function AdminViewDoctors() {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        AXIOS.get("http://localhost:9000/api/admin/adminviewdoctors")
            .then((res) => setDoctors(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleAction = (id, doctorStatus) => {
        const doctorStatusChange = doctorStatus === "Active" ? "Deactivated" : "Active";
        AXIOS.put("http://localhost:9000/api/admin/action-on-doctor", { id, doctorStatusChange })
            .then((res) => {
                window.location.reload()
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredDoctors = doctors.filter(doctor =>
        doctor.docname.toLowerCase().includes(searchTerm) ||
        doctor.specialization.toLowerCase().includes(searchTerm) ||
        doctor.email.toLowerCase().includes(searchTerm)
    );

    return (
        <>
            <AdminNavbar />
            <div className="container mt-5 mb-5">
                <h2 className="text-center text-primary mb-4">Registered Doctors</h2>

                <Form.Control
                    type="text"
                    placeholder="Search by name, specialization, or email..."
                    className="mb-3"
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
                                    <td>{doctor.docname}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:9000/uploads/${doctor.profileImage}`}
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
                                        <span className={`badge ${doctor.doctorStatus == 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                            {doctor.doctorStatus == "Active" ? 'Active' : 'Deactivated'}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <Button
                                            className="btn btn-sm"
                                            variant={doctor.doctorStatus === "Active" ? "danger" : "success"}
                                            onClick={() => handleAction(doctor._id, doctor.doctorStatus)}
                                        >
                                            {doctor.doctorStatus === "Active" ? "Deactivate" : "Activate"}
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
