/*
  Warnings:

  - You are about to drop the column `sale_date` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `saleDate` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invoice` DROP COLUMN `sale_date`,
    ADD COLUMN `saleDate` DATETIME(3) NOT NULL;
