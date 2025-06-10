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
        AXIOS.get("http://localhost:9000/api/admin/adminviewusers")
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleAction = (id, userStatus) => {
        const userStatusChange = userStatus === "Active" ? "Deactivated" : "Active";
        AXIOS.put("http://localhost:9000/api/admin/action-on-user", { id, userStatusChange })
            .then((res) => {
                setUsers(prev =>
                    prev.map(user =>
                        user._id === id ? { ...user, userStatus: userStatusChange } : user
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
                                    <td><span className={`badge ${user.userStatus=='Active' ? 'bg-success' : 'bg-secondary'}`}>
                                            {user.userStatus=="Active" ? 'Active' : 'Deactivated'}
                                        </span></td>
                                    <td className="text-center">
                                        <Button
                                            className="btn btn-sm"
                                            variant={user.userStatus === "Active" ? "danger" : "success"}
                                            onClick={() => handleAction(user._id, user.userStatus)}
                                        >
                                            {user.userStatus === "Active" ? "Deactivate" : "Activate"}
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
