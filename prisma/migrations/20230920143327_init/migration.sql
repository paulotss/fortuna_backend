/*
  Warnings:

  - You are about to drop the column `bar_code` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `cell_phone` on the `User` table. All the data in the column will be lost.
  - Added the required column `barCode` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cellPhone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Manager` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `bar_code`,
    ADD COLUMN `barCode` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `Seller` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `User` DROP COLUMN `cell_phone`,
    ADD COLUMN `cellPhone` VARCHAR(45) NOT NULL;
