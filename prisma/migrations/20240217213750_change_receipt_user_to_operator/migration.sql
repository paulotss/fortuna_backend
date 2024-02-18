/*
  Warnings:

  - You are about to drop the column `userId` on the `Receipts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Receipts` DROP FOREIGN KEY `Receipts_userId_fkey`;

-- AlterTable
ALTER TABLE `Receipts` DROP COLUMN `userId`,
    ADD COLUMN `operatorId` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Receipts` ADD CONSTRAINT `Receipts_operatorId_fkey` FOREIGN KEY (`operatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
