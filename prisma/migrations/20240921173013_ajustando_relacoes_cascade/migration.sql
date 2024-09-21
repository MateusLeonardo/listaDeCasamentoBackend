-- DropForeignKey
ALTER TABLE `auth_providers` DROP FOREIGN KEY `auth_providers_userId_fkey`;

-- DropForeignKey
ALTER TABLE `companions` DROP FOREIGN KEY `companions_guestId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_guestId_fkey`;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `guests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth_providers` ADD CONSTRAINT `auth_providers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companions` ADD CONSTRAINT `companions_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `guests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
