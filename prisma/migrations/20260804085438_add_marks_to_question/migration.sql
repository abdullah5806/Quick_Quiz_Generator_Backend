-- AlterTable
ALTER TABLE `question` ADD COLUMN `marks` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX `QuizAttempt_attemptedAt_idx` ON `QuizAttempt`(`attemptedAt`);

-- RenameIndex
ALTER TABLE `quizattempt` RENAME INDEX `QuizAttempt_quizId_fkey` TO `QuizAttempt_quizId_idx`;

-- RenameIndex
ALTER TABLE `quizattempt` RENAME INDEX `QuizAttempt_userId_fkey` TO `QuizAttempt_userId_idx`;

-- RenameIndex
ALTER TABLE `result` RENAME INDEX `Result_quizId_fkey` TO `Result_quizId_idx`;

-- RenameIndex
ALTER TABLE `result` RENAME INDEX `Result_studentId_fkey` TO `Result_studentId_idx`;

-- RenameIndex
ALTER TABLE `result` RENAME INDEX `Result_teacherId_fkey` TO `Result_teacherId_idx`;
