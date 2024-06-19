-- CreateTable
CREATE TABLE "Caixa" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER,

    CONSTRAINT "Caixa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Caixa_name_key" ON "Caixa"("name");
