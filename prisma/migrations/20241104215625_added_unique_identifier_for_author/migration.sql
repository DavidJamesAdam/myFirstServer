/*
  Warnings:

  - A unique constraint covering the columns `[author]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - Made the column `author` on table `books` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "books" ALTER COLUMN "author" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "books_author_key" ON "books"("author");
