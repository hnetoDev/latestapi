/*
  Warnings:

  - Added the required column `duration` to the `Plano` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plano" ADD COLUMN     "duration" TEXT NOT NULL;
