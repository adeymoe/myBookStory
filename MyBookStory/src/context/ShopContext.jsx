import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '\u20A6';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    // Manage user authentication state
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
    const [books, setBooks] = useState([]);
    const [buyOrders, setBuyOrders] = useState([]);
    const [soldBookIds, setSoldBookIds] = useState([]);

    // Fetch books securely
    const getBooksData = async () => {
        if (!token) return; // Ensure user is logged in before fetching books

        try {
            const response = await axios.get(`${backendUrl}/api/book/list`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                setBooks(response.data.books);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            toast.error("Failed to fetch books.");
        }
    };

    // Fetch logged-in user details
    const getUser = async () => {
        if (!token) {
            setUser(null);
            return;
        }

        try {
            const response = await axios.get(`${backendUrl}/api/user/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.user) {
                setUser(response.data.user);
            } else {
                console.error("Failed to fetch user details.");
            }
        } catch (error) {
            console.error("Error fetching user details:", error);

            if (error.response?.status === 401) {
                logout();
            } else {
                console.error("Failed to fetch user details.");
            }
        }
    };


    //All Paid Orders
    const getAllSoldBooks = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/order/allPaidOrders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const paidBookIds = response.data
                .filter(order => order.status === "paid" || "shipped" || "delivered")
                .map(order => order.book); 

            setSoldBookIds(paidBookIds);
        } catch (error) {
            console.error("Failed to fetch all paid orders:", error);
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user || null);
                toast.success("Login Successful!");
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please check your credentials.");
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            const response = await axios.post(`${backendUrl}/api/user/register`, userData);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                toast.success("Sign Up Successful!");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Registration failed.");
        }
    };

    //Get User BUY Orders

    const getUserBuyOrders = async (token) => {
        try {
            const response = await axios.get(`${backendUrl}/api/order/userBuyOrders`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            setBuyOrders(response.data)

            const paidBookIds = response.data
                .filter(order => order.status === "paid")
                .map(order => order.book); // this is the book ID
            setSoldBookIds(paidBookIds);

        } catch (error) {
            console.error("Failed to fetch buy orders:", error);
        }
    }

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);

        toast.success("Logged out successfully");

        setTimeout(() => {
            navigate('/account');
        }, 500);
    };

    // Load user and books when token changes
    useEffect(() => {
        if (token) {
            getUser();
            getBooksData();
            getUserBuyOrders(token);
            getAllSoldBooks();
        }
    }, [token]);

    // Persist user data when it updates
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const value = {
        books, setBooks, currency, navigate, backendUrl, setToken, token, user, setUser, login, register, logout, buyOrders, setBuyOrders, getUserBuyOrders, soldBookIds, getAllSoldBooks
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
