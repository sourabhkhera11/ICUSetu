//Setting up the express and the important libraries
import dbConnect from "./db/db.js";
import express from "express";
const app = express();
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import morgan from "morgan"; //To log every http request on console
import cors from "cors";

//All the important middlewares that need to be executed first

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); //For parsing the content in the req body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //For parsing the content in the req cookies
app.use(morgan("dev"));

//Importing Routes

import hospitalRoutes from "./routes/hospital.routes.js";
import bedRoutes from "./routes/bedRoutes.js";

//Seting up the routes and subroutes

app.use("/hospitals", hospitalRoutes);
app.use("/beds", bedRoutes);

//Application Level Route
app.use("/", (req, res) => {
  console.log("Application level route is working !");
  res.send("Hello World");
});

//Best practice once db is connected now our server is ready to handle the requests
dbConnect()
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Failed to connect to DB ${err}`);
  });
