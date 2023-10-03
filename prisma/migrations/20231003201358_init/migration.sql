/*
  Warnings:

  - You are about to drop the `InvoiceHasProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `InvoiceHasProduct` DROP FOREIGN KEY `InvoiceHasProduct_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `InvoiceHasProduct` DROP FOREIGN KEY `InvoiceHasProduct_productId_fkey`;

-- DropTable
DROP TABLE `InvoiceHasProduct`;

-- CreateTable
CREATE TABLE `_InvoiceToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_InvoiceToProduct_AB_unique`(`A`, `B`),
    INDEX `_InvoiceToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_InvoiceToProduct` ADD CONSTRAINT `_InvoiceToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Invoice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InvoiceToProduct` ADD CONSTRAINT `_InvoiceToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
