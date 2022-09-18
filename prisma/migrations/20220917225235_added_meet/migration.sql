-- CreateTable
CREATE TABLE "Meet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slots" JSONB NOT NULL,
    "slug" TEXT NOT NULL,
    "about" TEXT,
    "link" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Meet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applicant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "meetID" TEXT NOT NULL,

    CONSTRAINT "Applicant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meet_slug_key" ON "Meet"("slug");

-- AddForeignKey
ALTER TABLE "Meet" ADD CONSTRAINT "Meet_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_meetID_fkey" FOREIGN KEY ("meetID") REFERENCES "Meet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
