import mongoose, {Mongoose} from "mongoose";

const MONGO_URL = process.env.MONGODB_URL

interface MongooseConnection {
    connection: Mongoose | null;
    promise: Promise<Mongoose> | null
}