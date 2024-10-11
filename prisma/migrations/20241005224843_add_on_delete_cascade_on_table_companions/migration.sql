-- DropForeignKey
ALTER TABLE `companions` DROP FOREIGN KEY `companions_guestId_fkey`;

-- AddForeignKey
ALTER TABLE `companions` ADD CONSTRAINT `companions_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `guests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
