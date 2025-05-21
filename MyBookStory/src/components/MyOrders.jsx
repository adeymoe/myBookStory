import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { X, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const MyOrders = () => {
  const { books, user, token, setBooks, buyOrders, getUserBuyOrders } = useContext(ShopContext);

  const removeBook = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/book/remove`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success("Book Deleted successfully!!");
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      } else {
        toast.error("Error Occurred!!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  useEffect(() => {
    getUserBuyOrders(token);
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-10">
      {/* SELL ORDERS */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">SELL ORDER</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="p-3">Order Type</th>
                <th className="p-3">Book Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3">Likes</th>
                <th className="p-3">Date Listed</th>
                <th className="p-3">
                  <X />
                </th>
              </tr>
            </thead>
            <tbody>
              {books
                .filter((book) => book.user === user.id || book.user?._id === user.id)
                .map((book) => (
                  <tr key={book._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">SELL</td>
                    <td className="p-3 font-medium">{book.name}</td>
                    <td className="p-3">{book.price}</td>
                    <td className="p-3">
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs">
                        created
                      </span>
                    </td>
                    <td className="p-3">{book.likes}</td>
                    <td className="p-3">
                      {new Date(book.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td onClick={() => removeBook(book._id)}>
                      <Trash2 size={17} className="text-red-500 cursor-pointer" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* BUY ORDERS */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">BUY ORDER</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-600 text-white text-left">
                <th className="p-3">Order Type</th>
                <th className="p-3">Book Name</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Order Date</th>
              </tr>
            </thead>
            <tbody>
              {buyOrders?.length > 0 ? (
                buyOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">BUY</td>
                    <td className="p-3 font-medium">
                      {order.book?.name || "Book not found"}
                    </td>
                    <td className="p-3">{order.amount}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 text-xs rounded-md text-white ${order.status === "paid" ? "bg-green-600" : "bg-yellow-500"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-gray-500 text-center">
                    No purchase orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
