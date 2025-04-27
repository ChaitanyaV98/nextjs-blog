import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const connectionUrl = process.env.MONGO_URL;
    await mongoose.connect(connectionUrl);
    console.log("Successfully connected to db");
  } catch (error) {
    console.log("Connection to db failed!!", error);
    return error;
  }
};

export default connectToDB;
