/*
  Warnings:

  - You are about to drop the column `plano` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[planoId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "plano",
ADD COLUMN     "planoId" TEXT;

-- CreateTable
CREATE TABLE "Plano" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Plano_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_planoId_key" ON "User"("planoId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "Plano"("id") ON DELETE SET NULL ON UPDATE CASCADE;
