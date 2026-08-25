import prisma from "../config/db.js";
// Get all Students
export const getAllStudents = async (req, res) => {
    try {
        const students = await prisma.user.findMany({
            where: {
                role: "Student",
            },
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json({
            success: true,
            count: students.length,
            data: students,
        });
    } catch (error) {
        console.error("Get All Students Error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// Get All Quizzes
export const getAllQuizzes = async (req, res) => {
    try{
        const quizzes = await prisma.quiz.findMany({
            include: { 
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email : true
                    }
                }
            }
        });
        return res.status(200).json({
            success: true,
            count: quizzes.length,
            data: quizzes
        });
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Asign Quiz to the Student
export const assignQuiz = async (req, res) => {
    try {
        const { quizId, studentIds } = req.body;
        // Validate quizId
        if (!quizId) {
            return res.status(400).json({
                success: false,
                message: "Quiz ID is required",
            });
        }
        // Validate studentIds
        if (!Array.isArray(studentIds) || studentIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one student must be selected",
            });
        }
        const quizIdNumber = Number(quizId);
        const studentIdNumbers = studentIds.map(Number);
        // Check invalid IDs
        if (
            Number.isNaN(quizIdNumber) ||
            studentIdNumbers.some((id) => Number.isNaN(id))
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid quiz ID or student ID",
            });
        }
        const quiz = await prisma.quiz.findUnique({
            where: {id: quizIdNumber,},
        }); 
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found",
            });
        }
        const students = await prisma.user.findMany({
            where: {
                id: {
                    in: studentIdNumbers,
                },
                role: "Student",
            },
            select: {
                id: true,
                name: true,
            },
        });
        if (students.length !== studentIdNumbers.length) {
            return res.status(400).json({
                success: false,
                message: "One or more selected students were not found",
            });
        }
        const assignments = await prisma.assignQuiz.createMany({
            data: studentIdNumbers.map((studentId) => ({
                quizId: quizIdNumber,
                studentId: studentId,
            })),
            skipDuplicates: true,
        });
        return res.status(201).json({
            success: true,
            message: "Quiz assigned successfully",
            assignedCount: assignments.count,
        });
    } 
    catch (error) {
        console.error("Assign Quiz Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to assign quiz",
        });
    }
};

