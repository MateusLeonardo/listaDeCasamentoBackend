-- DropForeignKey
ALTER TABLE `companions` DROP FOREIGN KEY `companions_guestId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_guestId_fkey`;

-- AlterTable
ALTER TABLE `companions` MODIFY `guestId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `guests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companions` ADD CONSTRAINT `companions_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `guests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
