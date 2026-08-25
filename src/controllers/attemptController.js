import prisma from "../config/db.js";

// Student Attempt Quiz
export const attemptQuiz = async (req, res) => {
    try {
        const userId = req.user.id;
        const { quizId, answers } = req.body;
        const numericQuizId = Number(quizId);
        if (!quizId || !Number.isInteger(numericQuizId)) {
            return res.status(400).json({
                success: false,
                message: "Valid Quiz ID is required",
            });
        }
        if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
            return res.status(400).json({
                success: false,
                message: "Answers are required",
            });
        }
        const quiz = await prisma.quiz.findUnique({
            where: { id: numericQuizId, },
            select: {
                id: true,
                title: true,
                teacherId: true,
            },
        });
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found",
            });
        }
        const questions = await prisma.question.findMany({
            where: { quizId: numericQuizId, },
            orderBy: { id: "asc", },
        });
        if (questions.length === 0) {
            return res.status(400).json({
                success: false,
                message: "This quiz has no questions",
            });
        }
        let score = 0;
        let correctAnswers = 0;
        let wrongAnswers = 0;
        questions.forEach((question, index) => {
            const studentAnswer = answers[index];
            if ( studentAnswer && studentAnswer === question.correctAns) {
                score += Number(question.marks || 0);
                correctAnswers++;
            } else {
                wrongAnswers++;
            }
        });
        const totalMarks = questions.reduce((total, question) => {
                return total + Number(question.marks || 0);
            },
            0
        );
        const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;
        const status = percentage >= 50 ? "Pass" : "Fail";
        const [attempt, result] = await prisma.$transaction([
            prisma.quizAttempt.create({
                data: {
                    userId: userId,
                    quizId: numericQuizId,
                    score: score,
                },
            }),
            prisma.result.create({
                data: {
                    studentId: userId,
                    teacherId: quiz.teacherId,
                    quizId: numericQuizId,
                    score: score,
                },
            }),
        ]);
        return res.status(201).json({
            success: true,
            message: "Quiz submitted successfully",
            data: {
                attemptId: attempt.id,
                resultId: result.id,
                quizId: numericQuizId,
                userId: userId,
                score: score,
                totalMarks: totalMarks,
                totalQuestions: questions.length,
                correctAnswers: correctAnswers,
                wrongAnswers: wrongAnswers,
                percentage: percentage,
                status: status,
                attemptedAt: attempt.attemptedAt,
                resultCreatedAt: result.createdAt,
            },
        });
    } 
    catch (error) {
        console.error("Attempt Quiz Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
//Teacher/Admin Can View All Attempts
export const getAllAttempts = async (req, res) => {
    try {
        const attempts = await prisma.quizAttempt.findMany({
        include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                quiz: true,
            },
            orderBy: {attemptedAt: "desc",},
        });
        return res.status(200).json({
            success: true,
            count: attempts.length,
            data: attempts,
        });
    } catch (error) {
        console.error(
            "Get All Attempts Error:",
            error
        );
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};