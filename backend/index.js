import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js"
import cors from "cors"

dotenv.config()

const app = express()

const port = 8080

// global middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// api endpoints
app.use("/api/v1/auth", authRouter)

app.listen(port, () => {
    connectDb()
    console.log(`Server is running on port http://localhost:${port}`)
})