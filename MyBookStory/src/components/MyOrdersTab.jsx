import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const MyOrdersTab = ({ isOpen, onClose }) => {
  const dropdownRef = useRef(null);

  const { books, user } = useContext(ShopContext);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose(); // Close the dropdown when clicking outside
      }
    }

    // Listen for both mouse clicks & touchscreen taps
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <Link to="/myorders">
      <div ref={dropdownRef} className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
        <p className="text-gray-700 font-semibold">My Orders</p>
        <div className="mt-3 space-y-2">
          {books.filter((book) => book.user === user.id).map((book, index) => (
            <div key={book._id} className="p-3 border-b">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-green-600">SELL</span>: {book.name}
              </p>
              <p className="text-xs text-gray-500">Status: Sell order created</p>
              <p className="text-xs text-gray-500">Date:  {new Date(book.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default MyOrdersTab;
