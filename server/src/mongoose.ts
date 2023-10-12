import mongoose from "mongoose";

// Replace 'mydb' with your database name
const uri = "mongodb://localhost:27017/mydb"; // Local MongoDB URI

mongoose.connect(uri);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Mongoose connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB using Mongoose");
  // You can define your MongoDB schemas and models here
});
