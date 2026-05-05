
import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: "Access token is missing" });
    }
    jwt.verify(token, "jwt_secret_key", (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid access token" });
        }
        req.user_id = user.user_id;
        next();
    });
}

export default authenticateToken;