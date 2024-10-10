/*
  Warnings:

  - You are about to drop the `QuizScore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuizScore" DROP CONSTRAINT "QuizScore_q_id_fkey";

-- DropForeignKey
ALTER TABLE "QuizScore" DROP CONSTRAINT "QuizScore_u_id_fkey";

-- DropTable
DROP TABLE "QuizScore";
