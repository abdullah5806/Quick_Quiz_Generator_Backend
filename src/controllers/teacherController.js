import prisma from "../config/db.js";

// Teacher Dashboard
export const getDashboard = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { studentName, quizName } = req.query;
    console.log("Student ID: ", studentName);
    console.log("Quiz ID:", quizName);
    const teacher = await prisma.user.findUnique({
      where: {id: teacherId,},
      select: {name: true,},
    });
    const totalQuizzes = await prisma.quiz.count({
      where: {teacherId,},
    });
    const totalStudents = await prisma.user.count({
      where: {role: "STUDENT",},
    });
    let studentId;
    if(studentName){
      const student = await prisma.user.findFirst({
        where:{
          name: studentName,
          role: "STUDENT"
        },
        select:{id: true}
      });
      if(student){
        studentId = student.id;
      }
    }
    let quizId;
    if (quizId){
      const quiz = await prisma.quiz.findFirst({
        where:{
          title: quizName,
          teacherId: teacherId
        },
        select:{id: true}
      });
      if(quiz){
        quizId = quizId;
      }
    }
    const attemptWhere = {quiz: {teacherId: teacherId},};
    if(studentId){
      attemptWhere.userId = userId;
    }
    if(quizId){
      attemptWhere.quizId = quizId;
    }
    const totalAttempts = await prisma.quizAttempt.count({
      where: attemptWhere,
    });
    const recentQuizzes = await prisma.quiz.findMany({
      where: {teacherId,},
      orderBy: {createdAt: "desc",},
      take: 5,
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
      },
    });
    const recentAttempts = await prisma.quizAttempt.findMany({
      where: attemptWhere,
      orderBy: {attemptedAt: "desc",},
      take: 5,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        quiz: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    const students = await prisma.user.findMany({
      where: {role: "STUDENT",},
      select: {
        id: true,
        name: true,
      },
      orderBy: {name: "asc",},
    });
    const quizzes = await prisma.quiz.findMany({
      where: {teacherId,},
      select: {
        id: true,
        title: true,
      },
      orderBy: {title: "asc",},
    });
    res.status(200).json({
      success: true,
      data: {
        teacherName: teacher.name,
        totalQuizzes,
        totalStudents,
        totalAttempts,
        recentQuizzes,
        recentAttempts,
        students,
        quizzes,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard.",
    });
  }
};
// Teacher Profile
export const getProfile = async (req, res) => {
  try {
    const teacher = await prisma.user.findUnique({
      where: {id: req.user.id,},
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile.",
    });
  }
};