import express from "express";
import {getAllStudents, getAllQuizzes, assignQuiz} from "../controllers/asignQuizController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Asign Quiz 
 *     description: Only by teacher
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Asign Quiz]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *       500:
 *         description: Server Error
 */

router.get("/students", authMiddleware, getAllStudents);

/**
 * @swagger
 * /api/quizzes:
 *   get:
 *     summary: Get all quizzes
 *     tags: [Asign Quiz]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of quizzes
 *       500:
 *         description: Server Error
 */

router.get("/quizzes", authMiddleware, getAllStudents);


router.post("/assign-quiz", assignQuiz);

export default router;