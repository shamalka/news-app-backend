import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).send("Access token not found")
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
            if (error) {
                res.status(403).send("Invalid access token")
            } else {
                req.user = user
                next();
            }
        })
    }
}

export {
    authenticateToken
}