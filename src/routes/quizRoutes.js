import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quizController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Quiz Management APIs
 */
/**
 * @swagger
 * /api/quizzes:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.post("/", authMiddleware, roleMiddleware("TEACHER"), createQuiz);

/**
 * @swagger
 * /api/quizzes:
 *   get:
 *     summary: Get all quizzes
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of quizzes
 *       500:
 *         description: Server Error
 */
router.get("/", authMiddleware, getAllQuizzes);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   get:
 *     summary: Get quiz by ID
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz found
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server Error
 */
router.get("/:id", authMiddleware, getQuizById);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   put:
 *     summary: Update quiz
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server Error
 */
router.put("/:id", authMiddleware, roleMiddleware("TEACHER"), updateQuiz);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   delete:
 *     summary: Delete quiz
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server Error
 */
router.delete("/:id", authMiddleware, roleMiddleware("TEACHER"), deleteQuiz);

export default router;