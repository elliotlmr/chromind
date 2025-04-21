/*
  Warnings:

  - You are about to drop the `Entry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_userId_fkey";

-- DropTable
DROP TABLE "Entry";

-- CreateTable
CREATE TABLE "EmotionsRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "scores" JSONB NOT NULL,

    CONSTRAINT "EmotionsRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmotionsRecord" ADD CONSTRAINT "EmotionsRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
