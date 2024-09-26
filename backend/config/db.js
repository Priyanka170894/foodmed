import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Check the environment and use the appropriate MongoDB URI
    const mongoURI = process.env.NODE_ENV === 'development'
      ? process.env.MONGO_URI_DEV  // Development MongoDB URI
      : process.env.MONGO_URI_PROD; // Production MongoDB URI

      console.log(mongoURI);

    await mongoose.connect(mongoURI);

    // Log connection details based on the environment
    if (process.env.NODE_ENV === 'development') {
      console.log('Connected to MongoDB (Development)');
    } else {
      console.log('Connected to MongoDB (Production)');
    }
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
