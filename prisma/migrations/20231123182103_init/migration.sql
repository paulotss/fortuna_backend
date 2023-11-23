-- CreateTable
CREATE TABLE `Receipts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `method` VARCHAR(11) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `clientId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Receipts` ADD CONSTRAINT `Receipts_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
