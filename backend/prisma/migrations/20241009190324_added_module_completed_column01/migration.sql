/*
  Warnings:

  - You are about to drop the column `module_completed` on the `LearningMaterial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Engagement" ADD COLUMN     "module_completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "LearningMaterial" DROP COLUMN "module_completed";
