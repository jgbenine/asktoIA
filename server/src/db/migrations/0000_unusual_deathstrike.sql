CREATE TABLE "rooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
