import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization; // Get the Authorization header

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Not Authorized! Login again!" });
    }

    try {
        const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = token_decode.id;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: "Invalid Token" });
    }
}; 

export default authUser