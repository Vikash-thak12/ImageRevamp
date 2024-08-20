import mongoose, {connection, Mongoose} from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL

interface MongooseConnection {
    connection: Mongoose | null;
    promise: Promise<Mongoose> | null
}

let cached: MongooseConnection = (global as any).mongoose
if(!cached) {
    cached: (global as any).mongoose = {
        connection: null, promise: null
    }
}