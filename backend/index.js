import dotenv from "dotenv";
import express from "express";

dotenv.config()

const app = express()

const port = 8080

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})