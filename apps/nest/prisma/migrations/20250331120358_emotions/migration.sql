/*
  Warnings:

  - You are about to drop the column `name` on the `Emotion` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Emotion_name_key";

-- AlterTable
ALTER TABLE "Emotion" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "EmotionTranslation" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emotionId" TEXT NOT NULL,

    CONSTRAINT "EmotionTranslation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmotionTranslation" ADD CONSTRAINT "EmotionTranslation_emotionId_fkey" FOREIGN KEY ("emotionId") REFERENCES "Emotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
