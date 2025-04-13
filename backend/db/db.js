import mongoose from "mongoose";

//creating a connect function to mongo db
function connect() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default connect;
