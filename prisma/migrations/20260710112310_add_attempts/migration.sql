/*
  Warnings:

  - You are about to drop the column `createdAt` on the `quizattempt` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `quizattempt` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `quizattempt` table. All the data in the column will be lost.
  - Added the required column `score` to the `QuizAttempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `QuizAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `quizattempt` DROP FOREIGN KEY `QuizAttempt_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `quizattempt` DROP FOREIGN KEY `QuizAttempt_teacherId_fkey`;

-- DropIndex
DROP INDEX `QuizAttempt_studentId_fkey` ON `quizattempt`;

-- DropIndex
DROP INDEX `QuizAttempt_teacherId_fkey` ON `quizattempt`;

-- AlterTable
ALTER TABLE `quizattempt` DROP COLUMN `createdAt`,
    DROP COLUMN `studentId`,
    DROP COLUMN `teacherId`,
    ADD COLUMN `attemptedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `score` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `QuizAttempt` ADD CONSTRAINT `QuizAttempt_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
