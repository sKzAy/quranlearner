CREATE TABLE "user" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"liked" jsonb DEFAULT '[]'::jsonb,
	"updated_at" timestamp DEFAULT now()
);
