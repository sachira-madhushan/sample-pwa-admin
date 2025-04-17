import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function UsersPanel() {

    const [users, setUsers] = useState([]);

    // const [users,setUsers]=useState([
    //     { id: 1, name: "John Doe", email: "john@example.com", created_at: "2023-01-01", status: "Active" },
    //     { id: 2, name: "Jane Smith", email: "jane@example.com", created_at: "2023-02-01", status: "Inactive" },
    // ]);

    useEffect(() => {
        fetchUsers();
    })

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/admin/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }

    }

    const handleActiveInactive = (id) => {
        const targetUser = users.find((user) => user.id === id);
        const newStatus = targetUser.status === 1 ? 0 : 1;

        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, status: newStatus } : user
            )
        );

        alert(`User with ID ${id} has been ${newStatus.toLowerCase()}.`);
    };

    return (

        <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded shadow">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-4 py-2 border-b">ID</th>
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Email</th>
                            <th className="px-4 py-2 border-b">Created At</th>
                            <th className="px-4 py-2 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{user.id}</td>
                                <td className="px-4 py-2 border-b">{user.name}</td>
                                <td className="px-4 py-2 border-b">{user.email}</td>
                                <td className="px-4 py-2 border-b">{user.created_at}</td>
                                {
                                    user.status === 1 ? (
                                        <td className="px-4 py-2 border-b ">
                                            <button className='rounded bg-green-500 text-white px-4 py-1' onClick={() => handleActiveInactive(user.id)}>{user.status==1?"Active":"Inactive"}</button>
                                        </td>
                                    ) : (
                                        <td className="px-4 py-2 border-b">
                                            <button className='rounded bg-red-500 text-white px-4 py-1' onClick={() => handleActiveInactive(user.id)}>{user.status==1?"Active":"Inactive"}</button>
                                        </td>
                                    )

                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
