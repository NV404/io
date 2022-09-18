-- CreateTable
CREATE TABLE "Sponser" (
    "id" TEXT NOT NULL,
    "URL" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageURL" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sponser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Merch" (
    "id" TEXT NOT NULL,
    "URL" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageURL" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Merch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sponser" ADD CONSTRAINT "Sponser_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merch" ADD CONSTRAINT "Merch_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
