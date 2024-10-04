/*
  Warnings:

  - The primary key for the `QuizScore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `c_id` on the `QuizScore` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuizScore" DROP CONSTRAINT "QuizScore_pkey",
DROP COLUMN "c_id",
ALTER COLUMN "q_id" DROP DEFAULT,
ADD CONSTRAINT "QuizScore_pkey" PRIMARY KEY ("q_id", "u_id");
DROP SEQUENCE "QuizScore_q_id_seq";

-- CreateTable
CREATE TABLE "Quiz" (
    "q_id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "optionA" TEXT NOT NULL,
    "optionB" TEXT NOT NULL,
    "optionC" TEXT NOT NULL,
    "optionD" TEXT NOT NULL,
    "c_id" INTEGER NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("q_id")
);

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Course"("c_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizScore" ADD CONSTRAINT "QuizScore_q_id_fkey" FOREIGN KEY ("q_id") REFERENCES "Quiz"("q_id") ON DELETE RESTRICT ON UPDATE CASCADE;
