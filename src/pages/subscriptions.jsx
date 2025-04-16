import React from 'react'

export default function SubscriptionsPanel() {
    const subscriptions = [
        { id: 1, username: "John Doe", email: "john@example.com", package: "Trial", start_date: "2023-01-01", end_date: "2023-02-01", status: "Active" },
        { id: 2, username: "Jane Smith", email: "jane@example.com", package: "Monthly", start_date: "2023-02-01", end_date: "2023-03-01", status: "Expired" },
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
                            <th className="px-4 py-2 border-b">Package</th>
                            <th className="px-4 py-2 border-b">Start Date</th>
                            <th className="px-4 py-2 border-b">End Date</th>
                            <th className="px-4 py-2 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map((sub) => (
                            <tr key={sub.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{sub.id}</td>
                                <td className="px-4 py-2 border-b">{sub.username}</td>
                                <td className="px-4 py-2 border-b">{sub.email}</td>
                                <td className="px-4 py-2 border-b">{sub.package}</td>
                                <td className="px-4 py-2 border-b">{sub.start_date}</td>
                                <td className="px-4 py-2 border-b">{sub.end_date}</td>
                                {
                                    sub.status === "Active" ? (
                                        <td className="px-4 py-2 border-b text-green-600">{sub.status}</td>
                                    ) : (
                                        <td className="px-4 py-2 border-b text-red-600">{sub.status}</td>
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
