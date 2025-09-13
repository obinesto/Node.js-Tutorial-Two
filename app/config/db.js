import mongoose from "mongoose";
import { log } from "console";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    log(`Error: ${error.message}`);
    process.exit(1); // Exit with a non-zero status code to indicate an error
  }
};

export default connectDB;
