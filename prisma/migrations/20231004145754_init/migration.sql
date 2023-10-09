/*
  Warnings:

  - You are about to drop the `_InvoiceToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_InvoiceToProduct` DROP FOREIGN KEY `_InvoiceToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_InvoiceToProduct` DROP FOREIGN KEY `_InvoiceToProduct_B_fkey`;

-- DropTable
DROP TABLE `_InvoiceToProduct`;

-- CreateTable
CREATE TABLE `InvoiceToProduct` (
    `productId` INTEGER NOT NULL,
    `invoiceId` INTEGER NOT NULL,
    `value` DECIMAL(10, 2) NOT NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`productId`, `invoiceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InvoiceToProduct` ADD CONSTRAINT `InvoiceToProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceToProduct` ADD CONSTRAINT `InvoiceToProduct_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
