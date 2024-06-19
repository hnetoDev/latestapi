/*
  Warnings:

  - You are about to drop the column `value` on the `Caixa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Caixa" DROP COLUMN "value",
ADD COLUMN     "aplicativo" INTEGER,
ADD COLUMN     "dinheiro" INTEGER,
ADD COLUMN     "pix" INTEGER;
