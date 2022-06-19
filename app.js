import express from 'express';
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"

const app = express();

// middleware
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const dbString = ""

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(dbString, connectionParams).then(() => {
    console.info("Mongodb connected..")
}).catch((e) => {
    console.error("Error connecting to Mongodb database..")
})

app.use(userRoutes);

export default app;