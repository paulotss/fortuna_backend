/*
  Warnings:

  - Added the required column `cashierId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `cashierId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_cashierId_fkey` FOREIGN KEY (`cashierId`) REFERENCES `Cashier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
