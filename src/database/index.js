// import mongoose from "mongoose";

// const connectToDB = async () => {
//   try {
//     const connectionUrl = process.env.MONGO_URL;
//     await mongoose.connect(connectionUrl);
//     console.log("Successfully connected to db");
//   } catch (error) {
//     console.log("Connection to db failed!!", error);
//     return error;
//   }
// };

// export default connectToDB;

import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const connectionUrl = process.env.MONGO_URL;

    if (!connectionUrl) {
      throw new Error("MONGO_URL environment variable is not defined!");
    }

    if (mongoose.connections[0].readyState) {
      console.log("Already connected to MongoDB.");
      return;
    }

    await mongoose.connect(connectionUrl, {
      dbName: "your-db-name-here", // optional but good practice
    });

    console.log("Successfully connected to db 🚀");
  } catch (error) {
    console.error("Connection to db failed!!", error);
    throw error; // important! propagate error upward
  }
};

export default connectToDB;
