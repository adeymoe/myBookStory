import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(ShopContext);
    const location = useLocation();

    // Allow homepage to be accessible without authentication
    if (location.pathname === "/") {
        return children;
    }

    // Prevent redirect loop for the login/account page
    if (!token && location.pathname !== "/account") {
        return <Navigate to="/account" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
