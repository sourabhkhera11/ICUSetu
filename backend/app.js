//Setting up the express
import express from "express";
const app = express();
//for info of user accessing request
import morgan from "morgan";
//db connection
import connect from "./db/db.js";
connect();

import hospitalRoutes from "./routes/hospital.routes.js"
import bedRoutes from "./routes/bedRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
//middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
//Both are important for extracting request body data properly in Express.js.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//Routes

//To get the log of each request on the server
app.use(morgan("dev"));
app.use("/hospitals", hospitalRoutes);
app.use("/beds", bedRoutes);
app.use("/uploads", express.static("uploads"));
//dumy route
app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
