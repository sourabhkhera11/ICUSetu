//Setting up the environmental variables
import "dotenv/config.js";
import http from "http";
import app from "./app.js";
import fs from "fs";

// Ensure necessary folders exist
["uploads/temp", "uploads/hospitals"].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created missing folder: ${dir}`);
  }
});

//creating server
const server = http.createServer(app);
//Fetching the env variable from .env file
const port = process.env.PORT || 3001;
//listing to a post
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
