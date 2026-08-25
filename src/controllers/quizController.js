import prisma from "../config/db.js";
// Create Quiz only for Teachers
export const createQuiz = async (req, res) =>{
    try{
        const {title, description} = req.body;
        if(!title){
            res.status(400).json({
                success: false,
                message: "Quiz title is required"
            });
        }
        const quiz = await prisma.quiz.create({
            data: {
                title,
                description,
                teacherId: req.user.id
            }
        });
        return res.status(201).json({
            success: true,
            message: "Quiz Created Successfully",
            quiz
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
// Get All Quizzes
export const getAllQuizzes = async (req, res) => {
    try {
        const { search = "" } = req.query;
        const quizzes = await prisma.quiz.findMany({
            where: search
                ? {
                    OR: [
                        {
                            title: {contains: search}
                        },
                        {
                            description: {contains: search}
                        }
                    ]
                }
                : {},
            orderBy: {createdAt: "desc"}
        });
        res.status(200).json({
            success: true,
            quizzes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch quizzes"
        });
    }
};
// Get Quiz by Id 
export const getQuizById = async (req, res) => {
    try{
        const {id} = req.params;
        console.log("Quiz Id:",id);
        const quiz = await prisma.quiz.findUnique({
            where:{id: Number(id)},
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        if(!quiz){
            return res.status(404).json({
                success: false,
                message: "Quiz Not Found"
            });
        }
        return res.status(200).json({
            success: true,
            quiz,
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
// Update Quiz
export const updateQuiz = async (req,res) => {
    try{
        const {id} = req.params;
        const {title, description} = req.body;
        const quiz = await prisma.quiz.findUnique({
            where: {id: Number(id)}
        });
        if(!quiz){
            return res.status(404).json({
                success: false,
                message: "Quiz Not Found"
            });
        }
        if(quiz.teacherId != req.user.id){
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const updateQuiz = await prisma.quiz.update({
            where: {id: Number(id)},
            data: {
                title,
                description,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Quiz Updated Successfully",
            quiz: updateQuiz
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
// Delete Quiz
export const deleteQuiz = async (req, res) => {
    try {
        const quizId = Number(req.params.id);
        const quiz = await prisma.quiz.findUnique({
            where: {id: quizId,},
        });
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz Not Found",
            });
        }
        if (quiz.teacherId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }
        await prisma.result.deleteMany({
            where: {quizId: quizId,},
        });
        await prisma.quizAttempt.deleteMany({
            where: {quizId: quizId,},
        });
        await prisma.question.deleteMany({
            where: {quizId: quizId,},
        });
        await prisma.quiz.delete({
            where: {id: quizId,},
        });
        return res.status(200).json({
            success: true,
            message: "Quiz Deleted Successfully",
        });
    } 
    catch (error) {
        console.error("Delete Quiz Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};