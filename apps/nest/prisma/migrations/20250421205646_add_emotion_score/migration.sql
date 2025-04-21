/*
  Warnings:

  - You are about to drop the column `scores` on the `EmotionsRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmotionsRecord" DROP COLUMN "scores";

-- CreateTable
CREATE TABLE "EmotionScore" (
    "id" TEXT NOT NULL,
    "emotionId" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "EmotionScore_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmotionScore" ADD CONSTRAINT "EmotionScore_emotionId_fkey" FOREIGN KEY ("emotionId") REFERENCES "Emotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmotionScore" ADD CONSTRAINT "EmotionScore_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "EmotionsRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
