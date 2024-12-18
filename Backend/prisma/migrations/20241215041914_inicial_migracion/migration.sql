-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "nombre" TEXT NOT NULL DEFAULT 'ninguno',
    "apellido" TEXT NOT NULL DEFAULT 'ninguno',
    "email" TEXT NOT NULL,
    "signo_zodiacal" TEXT NOT NULL DEFAULT 'ninguno',
    "carrera" TEXT NOT NULL DEFAULT 'ninguno',
    "profesor" BOOLEAN NOT NULL,
    "contrasena" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posteos" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "me_gustas" INTEGER NOT NULL DEFAULT 0,
    "asunto" TEXT NOT NULL,
    "topico" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "posteos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comentarios" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "me_gustas" INTEGER NOT NULL DEFAULT 0,
    "asunto" TEXT NOT NULL,
    "posteoId" INTEGER NOT NULL,
    "autorId" INTEGER NOT NULL,

    CONSTRAINT "comentarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "posteos_usuarioId_key" ON "posteos"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "comentarios_posteoId_key" ON "comentarios"("posteoId");

-- CreateIndex
CREATE UNIQUE INDEX "comentarios_autorId_key" ON "comentarios"("autorId");

-- AddForeignKey
ALTER TABLE "posteos" ADD CONSTRAINT "posteos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_posteoId_fkey" FOREIGN KEY ("posteoId") REFERENCES "posteos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
