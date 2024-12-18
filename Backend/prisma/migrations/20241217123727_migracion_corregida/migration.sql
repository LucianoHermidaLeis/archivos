/*
  Warnings:

  - A unique constraint covering the columns `[posteoId]` on the table `comentarios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[autorNickname]` on the table `comentarios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[autorNickname]` on the table `posteos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "comentarios_posteoId_key" ON "comentarios"("posteoId");

-- CreateIndex
CREATE UNIQUE INDEX "comentarios_autorNickname_key" ON "comentarios"("autorNickname");

-- CreateIndex
CREATE UNIQUE INDEX "posteos_autorNickname_key" ON "posteos"("autorNickname");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");
