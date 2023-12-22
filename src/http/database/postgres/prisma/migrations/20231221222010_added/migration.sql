/*
  Warnings:

  - Added the required column `productId` to the `wish_list_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wish_list_item" ADD COLUMN     "productId" VARCHAR(100) NOT NULL;
