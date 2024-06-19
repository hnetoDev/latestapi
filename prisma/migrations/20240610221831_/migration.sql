-- AlterTable
ALTER TABLE "User" ADD COLUMN     "entradaId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_entradaId_fkey" FOREIGN KEY ("entradaId") REFERENCES "Entrada"("id") ON DELETE SET NULL ON UPDATE CASCADE;
