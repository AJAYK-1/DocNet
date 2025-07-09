import React, { useEffect, useState } from 'react';
import AXIOS from 'axios';
import AdminNavbar from './adminnavbar';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../footer';

export default function AdminViewUsers() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        AXIOS.get(`${import.meta.env.VITE_HOST_URL}/api/admin/adminviewusers`)
            .then((res) => {
                setUsers(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleAction = (id, accountStatus) => {
        const userStatusChange = accountStatus === "Active" ? "Deactivated" : "Active";
        AXIOS.put(`${import.meta.env.VITE_HOST_URL}/api/admin/action-on-user`, { id, userStatusChange })
            .then((res) => {
                setUsers(prev =>
                    prev.map(user =>
                        user._id === id ? { ...user, accountStatus: userStatusChange } : user
                    )
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );

    return (
        <>
            <AdminNavbar />
            <div className="container mt-5 mb-5" style={{ minHeight: '500px' }}>
                <h2 className="text-center mb-4 text-primary">Registered Users</h2>

                <Form.Control
                    type="text"
                    placeholder="Search by name or email..."
                    className="mb-3"
                    style={{ borderRadius: '20px', background: 'linear-gradient(170deg,rgb(244, 244, 244),rgb(160, 254, 149))' }}
                    onChange={handleSearchChange}
                />

                <div className="table-responsive shadow p-3 bg-white rounded">
                    <table className="table table-bordered table-striped table-hover">
                        <thead className="table-primary">
                            <tr>
                                <th scope="col">User Name</th>
                                <th scope="col">Email</th>
                                <th scope="col" className="text-center">User Status</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td><span className={`badge ${user.accountStatus=='Active' ? 'bg-success' : 'bg-secondary'}`}>
                                            {user.accountStatus=="Active" ? 'Active' : 'Deactivated'}
                                        </span></td>
                                    <td className="text-center">
                                        <Button
                                            className="btn btn-sm"
                                            variant={user.accountStatus === "Active" ? "danger" : "success"}
                                            onClick={() => handleAction(user._id, user.accountStatus)}
                                        >
                                            {user.accountStatus === "Active" ? "Deactivate" : "Activate"}
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
