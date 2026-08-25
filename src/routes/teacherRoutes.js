import express from "express";
import {
  getDashboard,
  getProfile,
} from "../controllers/teacherController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("TEACHER"));

/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: Teacher APIs
 */

/**
 * @swagger
 * /api/teacher/dashboard:
 *   get:
 *     summary: Get Teacher Dashboard
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/dashboard", getDashboard);

/**
 * @swagger
 * /api/teacher/profile:
 *   get:
 *     summary: Get Teacher Profile
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", getProfile);


export default router;