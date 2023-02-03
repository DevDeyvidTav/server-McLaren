/*
  Warnings:

  - Added the required column `phone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "phone" TEXT NOT NULL,
ALTER COLUMN "adress" DROP NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
