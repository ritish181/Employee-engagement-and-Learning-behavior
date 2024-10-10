/*
  Warnings:

  - You are about to drop the column `timeSpent` on the `Engagement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Engagement" DROP COLUMN "timeSpent";

-- CreateTable
CREATE TABLE "QuizScore" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "q_id" INTEGER NOT NULL,
    "u_id" INTEGER NOT NULL,

    CONSTRAINT "QuizScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseEnrollment" (
    "id" SERIAL NOT NULL,
    "c_id" INTEGER NOT NULL,
    "u_id" INTEGER NOT NULL,
    "course_completion" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseEnrollment_c_id_u_id_key" ON "CourseEnrollment"("c_id", "u_id");

-- AddForeignKey
ALTER TABLE "QuizScore" ADD CONSTRAINT "QuizScore_q_id_fkey" FOREIGN KEY ("q_id") REFERENCES "Quiz"("q_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizScore" ADD CONSTRAINT "QuizScore_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "Register"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Course"("c_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "Register"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;
