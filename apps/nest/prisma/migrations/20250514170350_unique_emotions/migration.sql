/*
  Warnings:

  - A unique constraint covering the columns `[color]` on the table `Emotion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[language,name]` on the table `EmotionTranslation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Emotion_color_key" ON "Emotion"("color");

-- CreateIndex
CREATE UNIQUE INDEX "EmotionTranslation_language_name_key" ON "EmotionTranslation"("language", "name");
