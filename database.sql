
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
	"user_id" serial,
	"survey_name" varchar(255),
	"administered" BOOLEAN,
	"date_administered" DATE,
	CONSTRAINT "survey_table_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "responses_table" (
	"id" serial NOT NULL,
	"survey_id" int NOT NULL,
	"name" varchar(255) NOT NULL,
	"question" varchar(1000) NOT NULL,
	"response" varchar(1000) NOT NULL,
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

ALTER TABLE "survey_question_table" ADD CONSTRAINT "survey_question_table_fk0" FOREIGN KEY ("survey_id") REFERENCES "survey_table"("id") ON DELETE CASCADE;

INSERT INTO "survey_table" ("user_id", "survey_name")
VALUES (1, 'Test survey'),
(1, 'Testing survey')


INSERT INTO "question_template_table" ("question")
VALUES ('How would you rate the presention today?'),
('What was one take-away from today?'),
('What could have been done differently?'),
('What is one area to improve?')

INSERT INTO "survey_question_table" ("survey_id", "question")
VALUES (3, 'What is one area to improve?'),
 (4, 'How would you rate the presention today?'),
(4, 'What was one take-away from today?'),
(4, 'What could have been done differently?');


