import express from "express";
import { basicController } from "../controllers/basicController";

const router = express.Router();

// Define a basic route
router.get("/hello", basicController);

export default router;
