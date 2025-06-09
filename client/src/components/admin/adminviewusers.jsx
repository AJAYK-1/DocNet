import React, { useEffect, useState } from 'react'
import AXIOS from 'axios'
import AdminNavbar from './adminnavbar'


export default function AdminViewUsers() {

    const [users, setusers] = useState([])
    useEffect(() => {
        AXIOS.get("http://localhost:9000/api/admin/adminviewusers")
            .then((res) => {
                console.log(res.data)
                setusers(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
        <AdminNavbar/>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <footer/>
        </>
    )
}
