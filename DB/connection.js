import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const result = await mongoose.connect(process.env.mongodb, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    return console.log(`DB connected successfully`);
  } catch (err) {
    return console.log(`Failed to connect on DB ${err}`);
  }
};

export default connectDB;
