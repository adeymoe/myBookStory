import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ success: false, message: "NOT AUTHORIZED" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check against admin role OR specific email
        const isAdmin = decoded.role === 'admin' || decoded.email === process.env.ADMIN_EMAIL;

        if (!isAdmin) {
            return res.status(403).json({ success: false, message: "NOT AUTHORIZED" });
        }

        req.admin = decoded; // attached for later use 
        next();
    } catch (error) {
        console.log("Admin Auth Error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default adminAuth;
