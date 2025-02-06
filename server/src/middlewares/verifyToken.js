const jwt = require('jsonwebtoken');
const { TokenExpiredError, JsonWebTokenError } = require('jsonwebtoken');
require("dotenv").config();

const verifyToken = (req, res, next) => {

    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {

        if (error instanceof TokenExpiredError) {
            return res.status(401).json({ message: "Token expired" });
        } else if (error instanceof JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" });
        } else {
            console.error("Token verification error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

module.exports = verifyToken;