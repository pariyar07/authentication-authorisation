import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://satyam_07:Monitor943@practisemongodb.efjxhvb.mongodb.net/?retryWrites=true&w=majority&appName=PractiseMongoDB'
    );
    console.log('MongoDB connected');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
