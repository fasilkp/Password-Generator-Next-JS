"use server";

import mongoose, { connection } from "mongoose";

const dbConnect = async () => {
    if(mongoose.connections?.[0]?.readyState){
      return mongoose.connections?.[0]?.readyState;
    }
    const connection= await mongoose.connect(process.env.MONGO_URL);
    return connection
}

export default dbConnect;