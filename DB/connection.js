import mongoose from 'mongoose';

const connectDB =async ()=>{
    try {
        const result = await mongoose.connect(process.env.DB_LOCAL);
        return console.log(`DB connected successfully`);
    } catch (err) {
        return console.log(`Failed to connect on DB ${err}`);
    }
};

export default connectDB                