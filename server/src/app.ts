import express from "express";
import routes from "./routes/basicRoute";
import mongoose from "mongoose";

const app = express();
const port = 3001;

const uri = "mongodb://localhost:27017/pokemon-idle-db";
mongoose.connect(uri);
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Mongoose connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB using Mongoose");
});

// Use the routes defined in routes.ts
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
