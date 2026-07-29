import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      "\n[FATAL] MONGODB_URI is missing.\n" +
      "Open backend/.env and set MONGODB_URI to your MongoDB connection string.\n"
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log(`[MongoDB] Connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error("[MongoDB] Connection failed:", err.message);
    process.exit(1);
  }
};
