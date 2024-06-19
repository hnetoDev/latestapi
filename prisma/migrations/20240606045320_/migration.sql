/*
  Warnings:

  - Added the required column `month` to the `Entrada` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entrada" ADD COLUMN     "month" INTEGER NOT NULL;
