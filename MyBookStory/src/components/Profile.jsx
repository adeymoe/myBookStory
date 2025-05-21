import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Profile = () => {
    const { user, logout, books, buyOrders } = useContext(ShopContext);

    const handleLogout = () => {
        logout();
    };

    const paidOrdersCount = buyOrders.filter(order => order.status === "paid").length;

    return (
        <div className="max-w-3xl mx-auto p-6 mb-3 bg-white shadow-lg rounded-lg">
            {/* Profile Header */}
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-16 h-16 text-gray-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold mt-3">{user.nickname}</h2>
                <p className="text-gray-500">{user.city}, {user.state}</p>
            </div>

            {/* Profile Details */}
            <div className="mt-6 space-y-3">
                <p className="text-gray-700">
                    <span className="font-medium">Visit my socials:</span>{" "}
                    <span className="text-blue-600">@yomibabs</span>
                </p>
                <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
                    <p className="italic text-gray-700 text-lg">
                        <span className="text-2xl text-blue-500">❝</span>
                        I started reading in an attempt to reduce my screen time, now I am in love with books. I just need to handle all my business in an healthy way.
                        <span className="text-2xl text-blue-500"> ❞</span>
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <Link to="/myorders">
                <div className="mt-6 flex justify-between bg-gray-100 p-4 rounded-lg">
                    <div className="text-center">
                        <p className="text-xl font-semibold">{paidOrdersCount}</p>
                        <p className="text-gray-600">Bought</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-semibold">
                            {books.filter((book) => book.user === user.id).length}
                        </p>
                        <p className="text-gray-600">SELL</p>
                    </div>
                </div>
            </Link>

            <div className="mt-6 flex justify-center gap-3">
                <Link to="/myorders">
                    <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded-lg font-medium hover:bg-blue-700 transition">
                        My Orders
                    </button>
                </Link>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 text-sm rounded-lg font-medium hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
