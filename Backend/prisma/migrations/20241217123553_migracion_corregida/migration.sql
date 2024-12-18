/*
  Warnings:

  - You are about to drop the column `autorId` on the `comentarios` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `posteos` table. All the data in the column will be lost.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `autorNickname` to the `comentarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `autorNickname` to the `posteos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comentarios" DROP CONSTRAINT "comentarios_autorId_fkey";

-- DropForeignKey
ALTER TABLE "posteos" DROP CONSTRAINT "posteos_usuarioId_fkey";

-- DropIndex
DROP INDEX "comentarios_autorId_key";

-- DropIndex
DROP INDEX "comentarios_posteoId_key";

-- DropIndex
DROP INDEX "posteos_usuarioId_key";

-- DropIndex
DROP INDEX "usuario_email_key";

-- AlterTable
ALTER TABLE "comentarios" DROP COLUMN "autorId",
ADD COLUMN     "autorNickname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posteos" DROP COLUMN "usuarioId",
ADD COLUMN     "autorNickname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("nickname");

-- AddForeignKey
ALTER TABLE "posteos" ADD CONSTRAINT "posteos_autorNickname_fkey" FOREIGN KEY ("autorNickname") REFERENCES "usuario"("nickname") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_autorNickname_fkey" FOREIGN KEY ("autorNickname") REFERENCES "usuario"("nickname") ON DELETE RESTRICT ON UPDATE CASCADE;
