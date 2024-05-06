DO $$ BEGIN
 CREATE TYPE "category" AS ENUM('RUNNING', 'TREKKING', 'GYM', 'TRAVEL', 'OTHER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "plan" AS ENUM('FREE', 'PRO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('USER', 'ATHLETE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "verify_status" AS ENUM('NOT VERIFIED', 'PENDING', 'VERIFIED', 'REJECTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "circle" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"image_url" text,
	"category" "category" DEFAULT 'OTHER' NOT NULL,
	"plan" "plan" DEFAULT 'FREE' NOT NULL,
	"state" text,
	"city" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"full_name" text,
	"phone" text,
	"avatar_url" text,
	"role" "role" DEFAULT 'USER' NOT NULL,
	"bio" text,
	"activity" "category" DEFAULT 'OTHER' NOT NULL,
	"dob" date,
	"verify_status" "verify_status" DEFAULT 'NOT VERIFIED' NOT NULL,
	"address_line1" text,
	"address_line2" text,
	"zip_code" integer,
	"city" text,
	"state" text,
	"country" text,
	"facebook_url" text,
	"x_url" text,
	"insta_url" text,
	"youtube_url" text,
	"strava_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_circle" (
	"user_id" integer NOT NULL,
	"circle_id" integer NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "username_idx" ON "user" ("username");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_idx" ON "user" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "userId_idx" ON "user_circle" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "circleId_idx" ON "user_circle" ("circle_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_circle" ADD CONSTRAINT "user_circle_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_circle" ADD CONSTRAINT "user_circle_circle_id_circle_id_fk" FOREIGN KEY ("circle_id") REFERENCES "circle"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
