/*
  Warnings:

  - Added the required column `updated_at` to the `unidades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "unidades" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
