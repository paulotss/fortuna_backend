/*
  Warnings:

  - You are about to drop the column `amount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `cashierId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_cashierId_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `amount`,
    DROP COLUMN `cashierId`;

-- CreateTable
CREATE TABLE `ProducstHasCashiers` (
    `productId` INTEGER NOT NULL,
    `cashierId` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`productId`, `cashierId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProducstHasCashiers` ADD CONSTRAINT `ProducstHasCashiers_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProducstHasCashiers` ADD CONSTRAINT `ProducstHasCashiers_cashierId_fkey` FOREIGN KEY (`cashierId`) REFERENCES `Cashier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
