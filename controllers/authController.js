import jwt from "jsonwebtoken";
import UserModel from "../models/user.js"
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import RefreshTokenModel from "../models/refreshToken.js";
import e from "express";
dotenv.config()

const login = async (req, res, next) => {
    const userObj = { username: req.body.username }
    const user = await UserModel.findOne(userObj);
    if (user === null) {
        res.status(400).send({ "message": "User not found" })
    } else {
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                const accessToken = generateAccessToken(userObj)
                const existingRefreshToken = await RefreshTokenModel.findOne({ username: req.body.username });
                if (existingRefreshToken) {
                    res.status(200).send({ accessToken: accessToken, refreshToken: existingRefreshToken.refreshToken });
                } else {
                    const refreshToken = jwt.sign(userObj, process.env.REFRESH_TOKEN_SECRET);
                    await RefreshTokenModel({
                        username: req.body.username,
                        refreshToken: refreshToken,
                        expiresIn: '3d'
                    }).save((error, refreshTokenObj) => {
                        if (error) {
                            next(error)
                            res.status(500).send({ "message": "Internal error occured" })
                        } else {
                            res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken });
                        }
                    })
                }
            } else {
                res.status(401).send({ "message": "User unauthorized" });
            }
        } catch {
            res.status(500).send({ "message": "Internal error occured" })
        }
    }
}

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
}

const authToken = async (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken) {
        const existingRefreshToken = await RefreshTokenModel.findOne({ refreshToken: refreshToken })
        if (existingRefreshToken) {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
                if (error) {
                    next(error)
                    res.status(403).send({ "message": "Invalid refresh token" })
                } else {
                    const accessToken = generateAccessToken({ username: user.username })
                    res.status(200).send({ accessToken: accessToken })
                }
            })
        } else {
            res.status(401).send({ "message": "Unauthorized" })
        }
    } else {
        res.status(400).send({ "message": "Refresh token not found" })
    }
}

const logout = async (req, res, next) => {
    let username = req.query.username;
    try {
        await RefreshTokenModel.deleteOne({ username: username })
        res.status(200).send({ "message": "User logged out" });
    } catch (error) {
        next(error)
    }
}

export {
    login,
    authToken,
    logout
}