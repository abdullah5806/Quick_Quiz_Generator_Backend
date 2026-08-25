import express from "express";
import {
  attemptQuiz,
  getAllAttempts,
} from "../controllers/attemptController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Attempts
 *   description: Quiz Attempt Management APIs
 */
/*
/**
 * @swagger
 * /api/attempt-quiz:
 *   post:
 *     summary: Submit a quiz
 *     tags: [Attempts]
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
 *               - answers
 *             properties:
 *               quizId:
 *                 type: integer
 *                 example: 1
 *
 *               answers:
 *                 type: object
 *                 example:
 *                   "0": "Paris"
 *                   "1": "JavaScript"
 *
 *     responses:
 *       201:
 *         description: Quiz submitted successfully
 *
 *       400:
 *         description: Invalid quiz or answers
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Quiz not found
 *
 *       500:
 *         description: Internal Server Error
 */
router.post("/", authMiddleware, roleMiddleware("STUDENT"), attemptQuiz);

/**
 * @swagger
 * /api/attempt-quiz/attempts:
 *   get:
 *     summary: Get all quiz attempts
 *     tags: [Attempts]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: All attempts fetched successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Access denied
 *
 *       500:
 *         description: Internal Server Error
 */

router.get("/attempts", authMiddleware, roleMiddleware("TEACHER", "ADMIN"), getAllAttempts);

export default router;