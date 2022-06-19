import jwt from "jsonwebtoken";
import User from "../models/user.js"
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
dotenv.config()

const login = async (req, res, next) => {
    const userObj = { username: req.body.username }
    const user = await User.findOne(userObj);
    if (user === null) {
        res.status(400).send("User not found")
    } else {
        try {
            console.log("try")
            if (await bcrypt.compare(req.body.password, user.password)) {
                console.log("password hash matched")
                const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1h'});
                console.log(accessToken)
                res.status(200).send({accessToken:accessToken});
            } else {
                res.status(401).send("User unauthorized");
            }
        } catch {
            res.status(500).send("Internal server error")
        }
    }
}

const logout = async (req, res, next) => {

}

export {
    login,
    logout
}