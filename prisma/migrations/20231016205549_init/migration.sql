/*
  Warnings:

  - You are about to drop the column `functionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Function` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `levelId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_functionId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `functionId`,
    ADD COLUMN `levelId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Function`;

-- CreateTable
CREATE TABLE `Level` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `acronym` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_levelId_fkey` FOREIGN KEY (`levelId`) REFERENCES `Level`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
