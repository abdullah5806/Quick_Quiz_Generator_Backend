import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";
import authRoutes from "./routes/authRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import asignQuizRoutes from "./routes/asignQuizRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attemptRoutes from "./routes/attemptRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  })
);
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Quick Quiz Generator Backend Running Successfully",
  });
});

// Swagger Documentation
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api", asignQuizRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/attempt-quiz", attemptRoutes);
app.use("/api/results", resultRoutes);
// Error Middleware
app.use(errorMiddleware);

export default app;