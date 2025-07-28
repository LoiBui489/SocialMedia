/*
  Warnings:

  - You are about to drop the column `rePostId` on the `post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_rePostId_fkey`;

-- DropIndex
DROP INDEX `Post_rePostId_fkey` ON `post`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `rePostId`,
    ADD COLUMN `originalPostId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_originalPostId_fkey` FOREIGN KEY (`originalPostId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
