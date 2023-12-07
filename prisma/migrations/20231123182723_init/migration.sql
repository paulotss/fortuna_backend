/*
  Warnings:

  - You are about to drop the column `method` on the `Receipts` table. All the data in the column will be lost.
  - Added the required column `methodId` to the `Receipts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Receipts` DROP COLUMN `method`,
    ADD COLUMN `methodId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Method` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Receipts` ADD CONSTRAINT `Receipts_methodId_fkey` FOREIGN KEY (`methodId`) REFERENCES `Method`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
