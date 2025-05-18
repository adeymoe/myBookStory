import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const AdminDashboard = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBookId, setEditingBookId] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [ordersRes, booksRes] = await Promise.all([
        axios.get(`${API_BASE}/api/order/all`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_BASE}/api/book/all`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : ordersRes.data.orders);
      setBooks(Array.isArray(booksRes.data) ? booksRes.data : booksRes.data.books);
    } catch (err) {
      console.error("Error fetching data", err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.post(`${API_BASE}/api/book/delete/${bookId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks((prev) => prev.filter((b) => b._id !== bookId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const startEdit = (book) => {
    setEditingBookId(book._id);
    setFormData({
      name: book.name,
      description: book.description,
      price: book.price,
    });
  };

  const saveEdit = async () => {
    try {
      const res = await axios.put(`${API_BASE}/api/book/update/${editingBookId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === editingBookId ? res.data : book
        )
      );
      setEditingBookId(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    if (!window.confirm("Are you sure you want to update order status?")) return;
  try {
    await axios.put(`${API_BASE}/api/order/update-status/${orderId}`, { status: newStatus }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  } catch (err) {
    console.error("Failed to update status:", err);
  }
};

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  if (loading) return <div className="p-6">Loading Admin Dashboard...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Orders Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">All Orders</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-2 border">Book</th>
                <th className="p-2 border">Buyer</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Seller</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
  {orders.map((order) => (
    <tr key={order._id} className="border-t text-sm">
      <td className="p-2 border">{order.name || order.book?.name}</td>
      <td className="p-2 border">{order.user?.email}</td>
      <td className="p-2 border">
        <select
          className="border p-1 rounded"
          value={order.status}
          onChange={(e) => handleStatusChange(order._id, e.target.value)}
        >
          <option value="pending">pending</option>
          <option value="paid">paid</option>
          <option value="shipped">shipped</option>
          <option value="delivered">delivered</option>
          <option value="cancelled">cancelled</option>
        </select>
      </td>
      <td className="p-2 border">{order.book?.user?.email}</td>
      <td className="p-2 border">
        {new Date(order.createdAt).toLocaleDateString()}
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </section>

      {/* Books Section */}
      <section>
        <h2 className="text-xl font-semibold mb-3">All Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="flex items-start justify-between border rounded-lg shadow bg-white p-4"
            >
              <div className="flex-1 pr-4">
                {editingBookId === book._id ? (
                  <>
                    <input
                      className="w-full border p-2 mb-2 rounded"
                      value={formData.name}
                      placeholder="Book Name"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <textarea
                      className="w-full border p-2 mb-2 rounded"
                      value={formData.description}
                      placeholder="Book Description"
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <input
                      type="number"
                      className="w-full border p-2 mb-2 rounded"
                      value={formData.price}
                      placeholder="Price"
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                    <div className="flex gap-2">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                        onClick={saveEdit}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded"
                        onClick={() => setEditingBookId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-800">{book.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{book.description}</p>
                    <p className="text-sm font-semibold text-blue-700">₦{book.price}</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                        onClick={() => startEdit(book)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                        onClick={() => deleteBook(book._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
              {book.image?.[0] && (
                <img
                  src={book.image[0]}
                  alt="Book"
                  className="w-28 h-28 object-cover rounded-lg border"
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
