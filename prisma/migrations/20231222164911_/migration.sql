/*
  Warnings:

  - You are about to drop the column `label` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `statut` on the `Task` table. All the data in the column will be lost.
  - Added the required column `name` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `columnId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "label",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "statut",
ADD COLUMN     "columnId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Columns" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "Columns_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Columns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
