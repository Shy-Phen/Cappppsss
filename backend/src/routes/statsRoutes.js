import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getStats } from "../contollers/statsController.js";

const route = express.Router();

route.get("/", verifyToken, getStats);

export default route;
