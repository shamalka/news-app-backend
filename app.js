import express from 'express';
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import dotenv from 'dotenv'
dotenv.config()

const app = express();

// middleware
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const dbString = "mongodb+srv://newsapp-backend:U82TbQJRuEnXHKr@news-app-backend-cluste.kg8jws7.mongodb.net/news-app-db?retryWrites=true&w=majority"

console.log(dbString)

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(dbString, connectionParams).then(() => {
    console.info("Mongodb connected..")
}).catch((e) => {
    console.error("Error connecting to Mongodb database..")
})

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

export default app;