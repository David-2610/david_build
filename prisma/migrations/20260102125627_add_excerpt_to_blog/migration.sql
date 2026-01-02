/*
  Warnings:

  - You are about to drop the column `type` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `excerpt` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Blog` DROP COLUMN `type`,
    ADD COLUMN `category` VARCHAR(191) NULL,
    ADD COLUMN `excerpt` VARCHAR(300) NOT NULL,
    ADD COLUMN `featured` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `images` JSON NULL,
    ADD COLUMN `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    ADD COLUMN `tags` JSON NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
