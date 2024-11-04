/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `books` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "books" ALTER COLUMN "author" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "books_title_key" ON "books"("title");
