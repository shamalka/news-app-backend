import User from "../models/user.js";
import bcrypt from 'bcrypt';

const addUser = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let userObject = { ...req.body }
    userObject.password = hashedPassword;

    const user = new User(userObject)
    user.save((error, user) => {
        if (error) {
            next(error)
            console.error("Error while adding user.")
        } else {
            res.status(200).send({ "message": "User added" })
        }
    })
}

const getUsers = async (req, res) => {
    const usersProjection = {
        password: false,
        _id: false,
        __v: false
    };

    User.find({}, usersProjection, (error, users) => {
        if (error) {
            next(error)
            console.error("Error while adding user.")
        } else {
            res.status(200).send(users)
        }
    })
}

export {
    addUser,
    getUsers
}