import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import hotelRoutes from "./routes/hotels.js";
import authRoutes from "./routes/auth.js";
import roomsRoutes from "./routes/rooms.js";
import userRoutes from "./routes/users.js"

dotenv.config();
const app = express();

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true },
    (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Database Connection Successful')
        }
    }
);

app.use(express.json());
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Backend Server is currently running on port ${port}`);
});