-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "fullName" VARCHAR(50) NOT NULL,
    "role" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "profileImage" VARCHAR(200) NOT NULL,
    "contact" VARCHAR(200) NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "houseNumber" VARCHAR(50) NOT NULL,
    "neighbourhood" VARCHAR(50) NOT NULL,
    "complement" VARCHAR(100),
    "country" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "fkUserId" VARCHAR(200) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_fkUserId_key" ON "Profile"("fkUserId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_fkUserId_fkey" FOREIGN KEY ("fkUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
