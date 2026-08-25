import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionsByQuizId,
} from "../controllers/questionController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Question Management APIs
 */

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - optionA
 *               - optionB
 *               - optionC
 *               - optionD
 *               - correctAns
 *               - quizId
 *             properties:
 *               question:
 *                 type: string
 *               optionA:
 *                 type: string
 *               optionB:
 *                 type: string
 *               optionC:
 *                 type: string
 *               optionD:
 *                 type: string
 *               correctAns:
 *                 type: string
 *               quizId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Question created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/",authMiddleware,roleMiddleware("TEACHER"),createQuestion);
/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Get all questions
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all questions
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, getAllQuestions);
/**
 * @swagger
 * /api/questions/{id}:
 *   get:
 *     summary: Get question by ID
 *     tags: [Questions]
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
 *         description: Question found
 *       404:
 *         description: Question not found
 */
router.get("/:id", authMiddleware, getQuestionById);
/**
 * @swagger
 * /api/questions/{id}:
 *   put:
 *     summary: Update a question
 *     tags: [Questions]
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
 *               question:
 *                 type: string
 *               optionA:
 *                 type: string
 *               optionB:
 *                 type: string
 *               optionC:
 *                 type: string
 *               optionD:
 *                 type: string
 *               correctAns:
 *                 type: string
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       404:
 *         description: Question not found
 */
router.put("/:id",authMiddleware,roleMiddleware("TEACHER"),updateQuestion);
/**
 * @swagger
 * /api/questions/{id}:
 *   delete:
 *     summary: Delete a question
 *     tags: [Questions]
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
 *         description: Question deleted successfully
 *       404:
 *         description: Question not found
 */
router.delete("/:id",authMiddleware,roleMiddleware("TEACHER"),deleteQuestion);

router.get("/quiz/:quizId", getQuestionsByQuizId);

export default router;