/*
  Warnings:

  - You are about to drop the column `treinoId` on the `Exercicio` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercicio" DROP CONSTRAINT "Exercicio_treinoId_fkey";

-- AlterTable
ALTER TABLE "Exercicio" DROP COLUMN "treinoId";

-- AlterTable
ALTER TABLE "Treino" ADD COLUMN     "exercicioId" TEXT;

-- AddForeignKey
ALTER TABLE "Treino" ADD CONSTRAINT "Treino_exercicioId_fkey" FOREIGN KEY ("exercicioId") REFERENCES "Exercicio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
