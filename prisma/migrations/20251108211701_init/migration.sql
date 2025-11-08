/*
  Warnings:

  - The `completed` column on the `Todo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "completed",
ADD COLUMN     "completed" INTEGER NOT NULL DEFAULT 0;
