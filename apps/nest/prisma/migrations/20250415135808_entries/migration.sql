/*
  Warnings:

  - You are about to drop the column `date` on the `Entry` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
