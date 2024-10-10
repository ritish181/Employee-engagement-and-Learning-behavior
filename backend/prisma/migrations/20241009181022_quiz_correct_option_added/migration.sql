/*
  Warnings:

  - Added the required column `correct_option` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "correct_option" TEXT NOT NULL;
