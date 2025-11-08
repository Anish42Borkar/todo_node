/*
  Warnings:

  - You are about to drop the column `copleted` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "copleted",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;
