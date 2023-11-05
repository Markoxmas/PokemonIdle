import express from "express";
import summonRoutes from "./routes/summonRoutes";
import pokemonRoutes from "./routes/pokemonRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import initAppRoutes from "./routes/initAppRoutes";
import upgradeRoutes from "./routes/upgradeRoutes";
import battleRoutes from "./routes/battleRoutes";
import authRoutes from "./routes/authRoutes";
import mongoose from "mongoose";
import authenticateToken from "./authenticateToken";

require("dotenv").config();

const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017/pokemon-idle-db";
mongoose.connect(uri);
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Mongoose connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB using Mongoose");
});

app.use("/auth", authRoutes);

app.use(authenticateToken);

//Protected routes
app.use("/summon", summonRoutes);
app.use("/pokemon", pokemonRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/init", initAppRoutes);
app.use("/upgrade", upgradeRoutes);
app.use("/battle", battleRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
