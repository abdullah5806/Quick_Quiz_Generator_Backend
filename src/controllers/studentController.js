import { includes } from "zod";
import prisma from "../config/db.js";
// Student Dashboard
export const getDashboard = async (req, res) => {
    try {
        const studentId = req.user.id;
        const student = await prisma.user.findUnique({
            where: { id: studentId },
            select: { 
                id: true,
                name: true ,
                email: true,
            },
        });
        const totalAssignQuizzes = await prisma.assignQuiz.count({
            where: {studentId: studentId},
        });
        const totalAttempts = await prisma.quizAttempt.count({
        where: {userId: studentId,},
        });
        const totalResults = await prisma.result.count({
        where: {studentId: studentId,},
        });
        const assignQuizzes = await prisma.assignQuiz.findMany({
            where: {studentId: studentId},
            include: {
                quiz:{
                    include: {
                        teacher: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {assignedAt: "desc",},
            take: 5,
        });
        const recentResults = await prisma.result.findMany({
            where: {studentId: studentId,},
            include: {
                quiz: true,
                teacher: {
                    select: {
                        id: true,
                    },
                },
            },
            orderBy: {createdAt: "desc",},
            take: 5,
        });
        res.status(200).json({
            success: true,
            data: {
                studentName: student.name,
                totalAssignQuizzes,
                totalAttempts,
                totalResults,
                assignQuizzes,
                recentResults,
            },
        });
    } 
    catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// Student Profile
export const getProfile = async (req, res)=> {
    try{
        const student = await prisma.user.findUnique({
            where: {id: req.user.id},
            select:{
                id: true,
                name: true,
                email: true,
                role: true
            }
        });
        res.status(200).json({
            success: true,
            data: student
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// Get All Quizzes
export const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await prisma.quiz.findMany({
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {createdAt: "desc"}
        });
        res.status(200).json({
            success: true,
            count: quizzes.length,
            data: quizzes
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// Attempt Quiz
export const attemptQuiz = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { quizId } = req.body;
        const quiz = await prisma.quiz.findUnique({
            where: {id: Number(quizId)}
        });
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }
        const attempt = await prisma.quizAttempt.create({
            data: {
                userId: studentId,
                quizId: Number(quizId),
                score: 0
            }
        });
        res.status(201).json({
            success: true,
            message: "Quiz attempt saved.",
            data: attempt
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// Get My Attempts Quizzes
export const getMyAttempts = async (req, res) => {
    try {
        const attempts = await prisma.quizAttempt.findMany({
            where: {studentId: req.user.id},
            include: {
                quiz: true,
                teacher: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {createdAt: "desc"}
        });
        res.status(200).json({
            success: true,
            data: attempts
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// Get My Results
export const getMyResults = async (req, res) => {
    try {
        const results = await prisma.result.findMany({
            where: {studentId: req.user.id},
            include: {
                quiz: true,
                teacher: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {createdAt: "desc"}
        });
        res.status(200).json({
            success: true,
            data: results
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// Get All Assign Quizzes 
export const getAssignQuizzes = async (req, res) => {
    try {
        const studentId = req.user.id;
        const assignedQuizzes = await prisma.assignQuiz.findMany({
            where: {studentId: studentId,},
            include: {
                quiz: {
                    include: {
                        teacher: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        questions: true,
                    },
                },
            },
            orderBy: {assignedAt: "desc",},
        });
        res.status(200).json({
            success: true,
            count: assignedQuizzes.length,
            data: assignedQuizzes,
        });
    } 
    catch (error) {
        console.error("Get Assigned Quizzes Error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
