import express from "express";
import {
  getMyResults,
  getAllResults,
  getResultById,
} from "../controllers/resultController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Result
 *   description: Result Management APIs
 */
/**
 * Get logged-in student's results
 *
 * GET /api/results/my
 */
router.get("/my", authMiddleware, roleMiddleware("Student"), getMyResults);

/**
 * Get all results
 *
 * GET /api/results
 *
 * Teacher only
 */
router.get("/", authMiddleware, roleMiddleware("Teacher"), getAllResults);

/**
 * Get result by ID
 *
 * GET /api/results/:id
 *
 * Student can view their own result.
 * Teacher can view results.
 */
router.get("/:id",authMiddleware,getResultById);

export default router;