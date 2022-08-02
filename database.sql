
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);



CREATE TABLE "survey_table" (
	"id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"survey_name" varchar(255) NOT NULL,
	"administered" BOOLEAN NOT NULL,
	"date_administered" DATE NOT NULL,
	CONSTRAINT "survey_table_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "responses_table" (
	"id" serial NOT NULL,
	"respondent_id" int NOT NULL,
	"question" varchar(1000) NOT NULL,
	"response" varchar(1000) NOT NULL,
	CONSTRAINT "responses_table_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "respondent_table" (
	"id" serial NOT NULL,
	"survey_id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "respondent_table_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "survey_question_table" (
	"id" serial NOT NULL,
	"survey_id" serial NOT NULL,
	"question" varchar(1000) NOT NULL,
	CONSTRAINT "survey_question_table_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "question_template_table" (
	"id" serial NOT NULL,
	"question" varchar(1000) NOT NULL,
	CONSTRAINT "question_template_table_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "survey_table" ADD CONSTRAINT "survey_table_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "responses_table" ADD CONSTRAINT "responses_table_fk0" FOREIGN KEY ("respondent_id") REFERENCES "respondent_table"("id");

ALTER TABLE "respondent_table" ADD CONSTRAINT "respondent_table_fk0" FOREIGN KEY ("survey_id") REFERENCES "survey_table"("id");

ALTER TABLE "survey_question_table" ADD CONSTRAINT "survey_question_table_fk0" FOREIGN KEY ("survey_id") REFERENCES "survey_table"("id");

INSERT INTO "question_template_table" ("question")
VALUES ('How would you rate the presention today?'),
('What was one take-away from today?'),
('What could have been done differently?'),
('What is one area to improve?')