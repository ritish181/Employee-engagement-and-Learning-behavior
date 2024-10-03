/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Sample` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `d_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `u_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "d_id" INTEGER NOT NULL,
ADD COLUMN     "u_id" SERIAL NOT NULL,
ADD COLUMN     "u_name" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("u_id");

-- DropTable
DROP TABLE "Sample";

-- CreateTable
CREATE TABLE "Register" (
    "u_id" SERIAL NOT NULL,
    "u_name" TEXT NOT NULL,
    "d_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Register_pkey" PRIMARY KEY ("u_id")
);

-- CreateTable
CREATE TABLE "Department" (
    "d_id" SERIAL NOT NULL,
    "d_name" TEXT NOT NULL,
    "empcount" INTEGER NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("d_id")
);

-- CreateTable
CREATE TABLE "LearningMaterial" (
    "m_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "c_id" INTEGER NOT NULL,

    CONSTRAINT "LearningMaterial_pkey" PRIMARY KEY ("m_id")
);

-- CreateTable
CREATE TABLE "Course" (
    "c_id" SERIAL NOT NULL,
    "c_name" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("c_id")
);

-- CreateTable
CREATE TABLE "Engagement" (
    "e_id" SERIAL NOT NULL,
    "timeSpent" INTEGER NOT NULL,
    "u_id" INTEGER NOT NULL,
    "c_id" INTEGER NOT NULL,
    "m_id" INTEGER NOT NULL,

    CONSTRAINT "Engagement_pkey" PRIMARY KEY ("e_id")
);

-- CreateTable
CREATE TABLE "QuizScore" (
    "q_id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "u_id" INTEGER NOT NULL,
    "c_id" INTEGER NOT NULL,

    CONSTRAINT "QuizScore_pkey" PRIMARY KEY ("q_id")
);

-- CreateTable
CREATE TABLE "DiscussionParticipation" (
    "id" SERIAL NOT NULL,
    "c_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "u_id" INTEGER NOT NULL,

    CONSTRAINT "DiscussionParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "f_id" SERIAL NOT NULL,
    "remarks" TEXT NOT NULL,
    "u_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "c_id" INTEGER NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("f_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Register_email_key" ON "Register"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_d_id_fkey" FOREIGN KEY ("d_id") REFERENCES "Department"("d_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningMaterial" ADD CONSTRAINT "LearningMaterial_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Course"("c_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "User"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_m_id_fkey" FOREIGN KEY ("m_id") REFERENCES "LearningMaterial"("m_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizScore" ADD CONSTRAINT "QuizScore_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "User"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionParticipation" ADD CONSTRAINT "DiscussionParticipation_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "User"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "User"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Course"("c_id") ON DELETE RESTRICT ON UPDATE CASCADE;
