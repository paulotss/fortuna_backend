/*
  Warnings:

  - You are about to alter the column `value` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `Expense` MODIFY `value` DECIMAL(10, 2) NOT NULL;
