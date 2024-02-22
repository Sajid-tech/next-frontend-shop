import mongoose from "mongoose"

const mongooseConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongo connection suucessfull")
    } catch (error) {
        throw new Error("Error in connecting to mongodb")
    }

}

export default mongooseConnect