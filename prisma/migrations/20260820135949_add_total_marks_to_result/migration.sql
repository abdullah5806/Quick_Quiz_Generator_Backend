-- AlterTable
ALTER TABLE `result` ADD COLUMN `totalMarks` INTEGER NOT NULL DEFAULT 1;

-- RenameIndex
ALTER TABLE `question` RENAME INDEX `Question_quizId_fkey` TO `Question_quizId_idx`;
