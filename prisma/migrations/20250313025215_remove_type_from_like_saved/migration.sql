/*
  Warnings:

  - You are about to drop the column `type` on the `like` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `saved` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `like` DROP COLUMN `type`;

-- AlterTable
ALTER TABLE `saved` DROP COLUMN `type`;
