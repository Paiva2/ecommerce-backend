-- CreateTable
CREATE TABLE "wish_list_item" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fkUserId" VARCHAR(100) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "image" VARCHAR(100) NOT NULL,

    CONSTRAINT "wish_list_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wish_list_item" ADD CONSTRAINT "wish_list_item_fkUserId_fkey" FOREIGN KEY ("fkUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
