import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    refreshToken: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: String,
        required: true,
    },
})

export default mongoose.model("RefreshToken", refreshTokenSchema);