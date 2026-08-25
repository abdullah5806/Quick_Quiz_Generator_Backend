-- CreateTable
CREATE TABLE `AssignQuiz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quizId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AssignQuiz_quizId_idx`(`quizId`),
    INDEX `AssignQuiz_studentId_idx`(`studentId`),
    UNIQUE INDEX `AssignQuiz_quizId_studentId_key`(`quizId`, `studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssignQuiz` ADD CONSTRAINT `AssignQuiz_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignQuiz` ADD CONSTRAINT `AssignQuiz_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `quiz` RENAME INDEX `Quiz_teacherId_fkey` TO `Quiz_teacherId_idx`;
