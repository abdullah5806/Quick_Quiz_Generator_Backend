import prisma from "../config/db.js";

// Get Logged-in Student's Results
export const getMyResults = async (req, res) => {
  try {
    const studentId = req.user.id;
    const results = await prisma.result.findMany({
      where: {studentId: studentId,},
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        quiz: {
          include: {
            questions: {
              select: {
                id: true,
                marks: true,
              },
            },
          },
        },
      },
      orderBy: {createdAt: "desc",},
    });
    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Get My Results Error:",error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Get Result By ID
export const getResultById = async (req, res) => {
  try {
    const { id } = req.params;
    const result =
      await prisma.result.findUnique({
        where: {id: Number(id),},
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          teacher: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          quiz: {
            include: {
              questions: {
                select: {
                  id: true,
                  marks: true,
                },
              },
            },
          },
        },
      });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Get Result By ID Error:",error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Teacher Get All Results 
export const getAllResults = async (req, res) => {
  try {
    const teacherId = req.user.id;
    console.log("Login Teacher ID:", teacherId)
    const results = await prisma.result.findMany({
      where: {
        quiz:{
          teacherId: teacherId,
        }
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        quiz: {
          include: {
            questions: {
              select: {
                id: true,
                marks: true,
              },
            },
          },
        },
      },
      orderBy: {createdAt: "desc",},
    });
    console.log("Teacher Results:", results);
    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Get Teacher Results Error:",error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};