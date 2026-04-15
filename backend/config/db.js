import mongoose from "mongoose";

const connectDb = async () => {
  const uri = process.env.MONGODB_URL || process.env.DB_URI || "mongodb://127.0.0.1:27017/VIBEZGRAM";

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log(" DB connected to", uri);
  } catch (err) {
    console.error(" DB ERROR:", err.message);
    console.error(" Ensure Atlas IP whitelist includes your current IP or use 0.0.0.0/0 for testing.");
    console.error(" Run: https://www.mongodb.com/docs/atlas/security/ip-access-list/");
    throw err;
  }
};

export default connectDb;