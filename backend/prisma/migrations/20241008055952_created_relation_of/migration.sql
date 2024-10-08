-- AddForeignKey
ALTER TABLE "DiscussionParticipation" ADD CONSTRAINT "DiscussionParticipation_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Course"("c_id") ON DELETE RESTRICT ON UPDATE CASCADE;
