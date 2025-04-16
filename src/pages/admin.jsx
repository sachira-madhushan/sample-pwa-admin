import React, { useState } from "react";
import UsersPanel from "./users";
import SubscriptionsPanel from "./subscriptions";
const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState("users");






    return (
        <div className="flex h-screen">
            <div className="w-64 bg-gray-100 p-6">
                <h3 className="text-xl font-bold mb-6">Admin Panel</h3>
                <ul className="space-y-2">
                    <li
                        className={`p-3 rounded cursor-pointer ${activeTab === "users" ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
                            }`}
                        onClick={() => setActiveTab("users")}
                    >
                        Manage Users
                    </li>
                    <li
                        className={`p-3 rounded cursor-pointer ${activeTab === "subscriptions" ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
                            }`}
                        onClick={() => setActiveTab("subscriptions")}
                    >
                        Subscriptions
                    </li>
                </ul>
            </div>


            <div className="flex-1 p-6 overflow-y-auto">
                {activeTab === "users" && (
                    <UsersPanel />
                )}

                {activeTab === "subscriptions" && (<SubscriptionsPanel />
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
