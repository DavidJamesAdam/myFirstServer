/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - Made the column `title` on table `books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `author` on table `books` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "books" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "author" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "books_title_key" ON "books"("title");
