-- CreateTable
CREATE TABLE "BlackListedToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "blacklistedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlackListedToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlackListedToken_token_key" ON "BlackListedToken"("token");
