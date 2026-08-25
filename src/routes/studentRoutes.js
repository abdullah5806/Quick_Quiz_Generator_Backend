import express from "express";
import {
    getDashboard,
    getProfile,
    getAllQuizzes,
    attemptQuiz,
    getMyAttempts,
    getMyResults
} from "../controllers/studentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student APIs
 */

/**
 * @swagger
 * /api/student/dashboard:
 *   get:
 *     summary: Get Student Dashboard
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/dashboard",authMiddleware,roleMiddleware("STUDENT"),getDashboard);
/**
 * @swagger
 * /api/student/profile:
 *   get:
 *     summary: Get Student Profile
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student profile fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/profile",authMiddleware,roleMiddleware("STUDENT"),getProfile);
/**
 * @swagger
 * /api/student/quizzes:
 *   get:
 *     summary: Get All Available Quizzes
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all quizzes
 *       401:
 *         description: Unauthorized
 */
router.get("/quizzes",authMiddleware,roleMiddleware("STUDENT"),getAllQuizzes);
/**
 * @swagger
 * /api/student/attempt:
 *   post:
 *     summary: Attempt a Quiz
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quizId
 *             properties:
 *               quizId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Quiz attempted successfully
 *       404:
 *         description: Quiz not found
 *       401:
 *         description: Unauthorized
 */
router.post("/attempt",authMiddleware,roleMiddleware("STUDENT"),attemptQuiz);
/**
 * @swagger
 * /api/student/attempts:
 *   get:
 *     summary: Get My Quiz Attempts
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student attempts fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/attempts",authMiddleware,roleMiddleware("STUDENT"),getMyAttempts);
/**
 * @swagger
 * /api/student/results:
 *   get:
 *     summary: Get My Quiz Results
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student results fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/results",authMiddleware,roleMiddleware("STUDENT"),getMyResults);

export default router;