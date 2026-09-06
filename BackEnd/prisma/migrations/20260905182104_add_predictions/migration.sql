-- CreateTable
CREATE TABLE "Prediction" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "homeWinPct" DOUBLE PRECISION NOT NULL,
    "drawPct" DOUBLE PRECISION NOT NULL,
    "awayWinPct" DOUBLE PRECISION NOT NULL,
    "computedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prediction_matchId_key" ON "Prediction"("matchId");

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
