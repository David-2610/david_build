/*
  Warnings:

  - The values [MOBILE,OTHER] on the enum `Project_category` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coverImage` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `techStack` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Project` ADD COLUMN `coverImage` VARCHAR(191) NOT NULL,
    ADD COLUMN `featured` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `githubUrl` VARCHAR(191) NULL,
    ADD COLUMN `order` INTEGER NULL,
    ADD COLUMN `shortDescription` VARCHAR(300) NOT NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('COMPLETED', 'IN_PROGRESS', 'EXPERIMENT') NOT NULL DEFAULT 'COMPLETED',
    ADD COLUMN `techStack` JSON NOT NULL,
    MODIFY `category` ENUM('WEB', 'AIML', 'GAME') NOT NULL DEFAULT 'WEB';

-- CreateTable
CREATE TABLE `ProjectMilestone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(500) NOT NULL,
    `date` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Project_slug_key` ON `Project`(`slug`);

-- AddForeignKey
ALTER TABLE `ProjectMilestone` ADD CONSTRAINT `ProjectMilestone_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
