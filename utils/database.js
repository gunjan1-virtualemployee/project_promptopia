import mongoose from 'mongoose';

let isConnected = false;

const connectToDB = async () => {
    mongoose.set('strictQuery')

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbNAME: "share_prompts",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}

export default connectToDB