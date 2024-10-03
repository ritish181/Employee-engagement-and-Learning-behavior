/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DiscussionParticipation" DROP CONSTRAINT "DiscussionParticipation_u_id_fkey";

-- DropForeignKey
ALTER TABLE "Engagement" DROP CONSTRAINT "Engagement_u_id_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_u_id_fkey";

-- DropForeignKey
ALTER TABLE "QuizScore" DROP CONSTRAINT "QuizScore_u_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_d_id_fkey";

-- AlterTable
ALTER TABLE "Register" ADD COLUMN     "approved" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE "User";

-- AddForeignKey
ALTER TABLE "Register" ADD CONSTRAINT "Register_d_id_fkey" FOREIGN KEY ("d_id") REFERENCES "Department"("d_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "Register"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizScore" ADD CONSTRAINT "QuizScore_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "Register"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionParticipation" ADD CONSTRAINT "DiscussionParticipation_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "Register"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "Register"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;
