import prisma from "../config/db.js"
 
// Create Question
export const createQuestion = async (req, res) =>{
    try {
        const {
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctAns,
            quizId,
            marks
        } = req.body ;
        if(
            !question ||
            !optionA ||
            !optionB ||
            !optionC ||
            !optionD ||
            !correctAns ||
            !quizId || 
            marks === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "ALL fields are required"
            });
        }
        const quiz = await prisma.quiz.findUnique({
            where: {id: Number(quizId) }
        });
        if(!quiz){
            return res.status(404).json({
                success: false,
                message: "Quiz Not Found"
            });
        }
        const newQuestion = await prisma.question.create({
            data:{
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                correctAns,
                marks: Number(marks),
                quizId: Number(quizId)
            }
        });
        res.status(201).json({
            success: true,
            message: "Question created Successfully",
            data: newQuestion
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// Get All Questions
export const getAllQuestions = async (req, res) => {
    try {
        const { search } = req.query;
        const questions = await prisma.question.findMany({
            where: search
                ? {
                    question: {contains: search,},
                }
                : {},
            orderBy: {id: "asc",},
        });
        return res.status(200).json({
            success: true,
            count: questions.length,
            data: questions,
        });
    } catch (error) {
        console.error("Get All Questions Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
// Get Question By ID 
export const getQuestionById = async (req, res)=>{
    try{
        const id = Number(req.params.id);
        const question = await prisma.question.findUnique({
            where: {id},
            include: {quiz: true}
        });
        if(!question){
            return res.status(404).json({
                success: false,
                message: "Question Not Found"
            });
        }
        res.status(200).json({
            success: true,
            data: question
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// Update Question 
export const updateQuestion = async (req, res)=>{
    try{
        const id = Number(req.params.id);
        if(!Number.isInteger(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Question Id"
            });
        }
        const{
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctAns
        } = req.body;
        const exist = await prisma.question.findUnique({
            where: {id}
        });
        if(!exist){
            return res.status(404).json({
                success: false,
                message: "Question Not Found"
            });
        }
        const UpdateQuestion = await prisma.question.update({
            where:{id},
            data: {
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                correctAns
            },
            include: { quiz: true},
        });
        res.status(200).json({
            success: true,
            message: "Question Updated Successfully",
            data: UpdateQuestion
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
// Delete Question
export const deleteQuestion = async (req, res)=> {
    try {
        const id = Number(req.params.id);
        const exist = await prisma.question.findUnique({
            where: {id}
        });
        if(!exist){
            return res.status(404).json({
                success: false,
                message: "Question Not Found"
            });
        }
        await prisma.question.delete({
            where: {id}
        });
        res.status(200).json({
            success: true,
            message: "Question Delete Successfully"
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
// Get Question By Quiz Id
export const getQuestionsByQuizId = async (req,res) => {
    try {
        const { quizId } = req.params;
        const numericQuizId = Number(quizId);
        if (!quizId || !Number.isInteger(numericQuizId)) {
            return res.status(400).json({
                success: false,
                message: "Valid Quiz ID is required",
            });
        }
        const quiz = await prisma.quiz.findUnique({
            where: {id: numericQuizId,},
        });
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found",
            });
        }
        const questions = await prisma.question.findMany({
            where: {quizId: numericQuizId,},
            orderBy: {id: "asc",},
            select: {
                id: true,
                question: true,
                optionA: true,
                optionB: true,
                optionC: true,
                optionD: true,
                marks: true,
                quizId: true,
            },
        });
        return res.status(200).json({
            success: true,
            count: questions.length,
            data: questions,
        });
    } 
    catch (error) {
        console.error("Get Questions By Quiz ID Error:",error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
