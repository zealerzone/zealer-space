ALTER TABLE "transactions" RENAME COLUMN "dat" TO "date";--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "notes" DROP NOT NULL;