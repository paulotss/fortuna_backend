/*
  Warnings:

  - You are about to drop the column `cpf` on the `Client` table. All the data in the column will be lost.
  - The primary key for the `UserHasRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `admin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` DROP COLUMN `cpf`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `admin` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `UserHasRole` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`userId`, `roleId`, `cashierId`);
