import User from "../models/user.js";

const addUser = (req, res, next) => {
    const user = new User(req.body)
    user.save((error, user) => {
        if(error){
            next(error)
            console.error("Error while adding user.")
        } else {
            res.status(200).send({"message":"User added"})
        }
    })
}

const getUsers = (req, res) => {
    User.find((error, users) => {
        if(error){
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