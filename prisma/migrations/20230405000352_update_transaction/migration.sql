/*
  Warnings:

  - Changed the type of `transactionType` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactionType",
ADD COLUMN     "transactionType" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TransactionType";
