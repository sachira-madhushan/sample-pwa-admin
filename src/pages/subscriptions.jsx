import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Modal from './add_subscription';
import moment from 'moment-timezone';
import config from '../config/config';
export default function SubscriptionsPanel() {

    const [subscriptions, setSubscriptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [packages, setPackages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(0);
    const [selectedPackage, setSelectedPackage] = useState(0);
    const [selectedAccountType,setActiveAccountType]=useState(0);

    const [accountTypes,setAccountTypes]=useState([
        {
            name:"Online",
            id:1
        },{
            name:"Offline",
            id:0
        }
    ]);

    useEffect(() => {
        fetchSubscriptions();
        fetchUsers();
        fetchPackages();
    }, [])

    const fetchSubscriptions = async () => {
        try {
            const response = await axios.get(config.URL + "/api/v1/subscription");
            setSubscriptions(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }

    }


    const fetchUsers = async () => {
        try {
            const response = await axios.get(config.URL + "/api/v1/admin/users",);
            setUsers(response.data);
        } catch (error) {
            console.log("Error fetching users:", error);
        }

    }

    const fetchPackages = async () => {
        try {
            const response = await axios.get(config.URL + "/api/v1/subscription/packages",);
            setPackages(response.data);
        } catch (error) {
            console.log("Error fetching packages:", error);
        }
    }

    const addPackage = async () => {
        try {
            const response = await axios.post(config.URL + "/api/v1/subscription", {
                userId: selectedUser,
                packageId: selectedPackage,
                accountType:selectedAccountType
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                    },
                }
            );
            if (response.status == 200) {
                alert("New package added");
            }
        } catch (error) {
            console.log("Error fetching packages:", error);
        }
    }

    function formatDuration(minutes) {
        const duration = moment.duration(minutes, 'minutes');

        const years = Math.floor(duration.asYears());
        const months = Math.floor(duration.asMonths() % 12);
        const days = Math.floor(duration.asDays() % 30);
        const hours = Math.floor(duration.asHours() % 24);
        const mins = Math.floor(duration.asMinutes() % 60);

        return `${years}y ${months}mo ${days}d ${hours}h ${mins}m`;
    }


    const handleAddSubscription = () => {
        setShowModal(true);
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
                            <th className="px-4 py-2 border-b">Package Type</th>
                            <th className="px-4 py-2 border-b">Start Date</th>
                            <th className="px-4 py-2 border-b">End Date</th>
                            <th className="px-4 py-2 border-b">Time Remaining</th>
                            <th className="px-4 py-2 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map((sub) => (
                            <tr key={sub.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{sub.id}</td>
                                <td className="px-4 py-2 border-b">{sub.user_name}</td>
                                <td className="px-4 py-2 border-b">{sub.user_email}</td>
                                <td className="px-4 py-2 border-b">{sub.package_name}</td>
                                <td className="px-4 py-2 border-b">{sub.package_type}</td>
                                <td className="px-4 py-2 border-b">{sub.start_date}</td>
                                <td className="px-4 py-2 border-b">{sub.end_date}</td>
                                <td className="px-4 py-2 border-b">{formatDuration(sub.remaining_minutes)}</td>
                                {
                                    sub.status === 1 ? (
                                        <td className="px-4 py-2 border-b text-green-600">{sub.status == 1 ? "Active" : "Expired"}</td>
                                    ) : (
                                        <td className="px-4 py-2 border-b text-red-600">{sub.status == 1 ? "Active" : "Expired"}</td>
                                    )

                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <h2 className="text-lg font-semibold mb-4">Add New Subscription</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select User</label>
                        <select
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="">-- Select User --</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Package</label>
                        <select
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setSelectedPackage(e.target.value)}
                        >
                            <option value="">-- Select Package --</option>
                            {packages.map((pkg) => (
                                <option key={pkg.id} value={pkg.id}>
                                    {pkg.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Type</label>
                        <select
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setActiveAccountType(e.target.value)}
                        >
                            <option value="">-- Select Type --</option>
                            {accountTypes.map((accounts) => (
                                <option key={accounts.id} value={accounts.id}>
                                    {accounts.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700" onClick={addPackage}>
                        Activate
                    </button>
                </Modal>

            </div>
        </div>

    )
}
