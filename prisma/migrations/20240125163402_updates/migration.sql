/*
  Warnings:

  - Changed the type of `price` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "items" ALTER COLUMN "amount" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
