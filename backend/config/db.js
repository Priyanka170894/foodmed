import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Check the environment and use the appropriate MongoDB URI
    const mongoURI = process.env.MONGO_URI_PROD;

      console.log(mongoURI);

    await mongoose.connect(mongoURI);

   
      console.log('Connected to MongoDB (Production)');
    
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
