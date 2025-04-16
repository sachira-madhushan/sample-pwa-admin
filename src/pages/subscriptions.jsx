import React from 'react'

export default function SubscriptionsPanel() {
    const subscriptions = [
        { id: 1, username: "John Doe", email: "john@example.com" },
        { id: 2, username: "Jane Smith", email: "jane@example.com" },
    ];
    const handleBanUser = (id) => {
        alert(`User with ID ${id} has been banned.`);
    };

    const handleAddSubscription = () => {
        alert("Add new subscription functionality.");
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Subscriptions</h2>
            <button
                onClick={handleAddSubscription}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
            >
                Add New Subscription
            </button>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded shadow">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-4 py-2 border-b">ID</th>
                            <th className="px-4 py-2 border-b">Username</th>
                            <th className="px-4 py-2 border-b">Email</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map((sub) => (
                            <tr key={sub.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{sub.id}</td>
                                <td className="px-4 py-2 border-b">{sub.username}</td>
                                <td className="px-4 py-2 border-b">{sub.email}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => handleBanUser(sub.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Ban
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
