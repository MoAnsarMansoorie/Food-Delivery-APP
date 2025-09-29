import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Databse connected successfully...`)
        
    } catch (error) {
        console.log("Database is not connected...", error)
    }
}

export default connectDb;