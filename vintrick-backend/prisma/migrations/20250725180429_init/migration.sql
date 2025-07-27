-- CreateTable
CREATE TABLE "HarvestLoad" (
    "uid" TEXT NOT NULL,
    "Vintrace_ST" TEXT NOT NULL,
    "Block" TEXT NOT NULL,
    "Tons" DOUBLE PRECISION NOT NULL,
    "Press" TEXT NOT NULL,
    "Tank" TEXT NOT NULL,
    "WO" TEXT NOT NULL,
    "Date_Received" TEXT NOT NULL,
    "AgCode_ST" TEXT NOT NULL,
    "Time_Received" TEXT NOT NULL,
    "Wine_Type" TEXT NOT NULL,
    "Est_Tons_1" DOUBLE PRECISION NOT NULL,
    "Est_Tons_2" DOUBLE PRECISION NOT NULL,
    "Est_Tons_3" DOUBLE PRECISION NOT NULL,
    "Press_Pick_2" DOUBLE PRECISION NOT NULL,
    "Linked" TEXT NOT NULL,
    "Crush_Pad" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "last_modified" TIMESTAMP(3) NOT NULL,
    "synced" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "HarvestLoad_pkey" PRIMARY KEY ("uid")
);
