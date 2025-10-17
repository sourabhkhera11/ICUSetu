import mongoose from "mongoose";

//creating a connect function to mongo db
const dbConnect = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

export default dbConnect;
