import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    const { connection } = await mongoose.connect(
      process.env.MONGO_CONNECTION_STR
    );
    if (connection.readyState == 1) {
      console.log("Database Connection Successfull.....");
    }
  } catch (errors) {
    return Promise.reject(errors);
  }
};

export default connectMongo;
