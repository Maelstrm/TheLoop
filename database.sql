-- Setup
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT 'FALSE',
    "email" varchar(150) NOT NULL,
    "first_name" varchar(25) NOT NULL,
    "last_name" varchar(25) NOT NULL,
    "employer" varchar(50) NOT NULL,
    "position" varchar(50) NOT NULL,
    "phone_number" varchar(10) NOT NULL,
    "joined_date" DATE NOT NULL,
    "total_req_left" integer NOT NULL DEFAULT '5'
);

CREATE TABLE "new_request" (
    "request_id" serial UNIQUE NOT NULL,
    "date_sent" DATE NOT NULL,
    "owned_by" integer NOT NULL REFERENCES "person",
	"written_from" integer DEFAULT NULL REFERENCES "person",
    "request_body" varchar(420) NOT NULL,
    "suggested_words" varchar(200) NOT NULL,
	"completed" BOOLEAN DEFAULT FALSE,
    CONSTRAINT new_Request_pk PRIMARY KEY ("request_id")
);

CREATE TABLE "industries" (
    "industry_id" serial NOT NULL,
    "industry_name" varchar(100) NOT NULL,
    CONSTRAINT industries_pk PRIMARY KEY ("industry_id")
);

CREATE TABLE "friendship" (
    "friendA_id" integer NOT NULL,
    "friendB_id" integer NOT NULL,
    "friend_status" BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE "Invitation" (
    "invitation_from" varchar(50) NOT NULL,
    "access_key" varchar(200) NOT NULL UNIQUE,
    "date_created" DATE NOT NULL,
    "activated" BOOLEAN NOT NULL DEFAULT 'FALSE'
);

CREATE TABLE "LinkedIn" (
    "user_id" varchar(200) NOT NULL,
    "linkedin_data" varchar(200) NOT NULL
);

CREATE TABLE "amazon_storage" (
    "referral_id" integer NOT NULL,
    "audio" varchar(50) NOT NULL,
    "video" varchar(50) NOT NULL,
    CONSTRAINT amazon_storage_pk PRIMARY KEY ("referral_id")
);

CREATE TABLE "fill_referral" (
	"new_request_id" integer NOT NULL REFERENCES "new_request",
    "referral_body" varchar(420) NOT NULL,
    "date_created" DATE NOT NULL,
    "aws_links" varchar,
    "can_contact" BOOLEAN NOT NULL DEFAULT 'TRUE',
	"favorite" BOOLEAN NOT NULL DEFAULT 'FALSE'
);

--End Setup

-- Query for retrieving all referrals that were written for the specific user
SELECT written_from, person.username, person.email, person.phone_number, fill_referral.date_created, fill_referral.referral_body, fill_referral.aws_links, fill_referral.can_contact, fill_referral.favorite,  person.employer, person.position
FROM "new_request" 
LEFT JOIN "fill_referral" ON "new_request"."request_id" = "fill_referral"."new_request_id"
JOIN "person" ON "new_request"."written_from" = "person"."id"
WHERE "owned_by" = 4 and "completed" IS TRUE
ORDER BY new_request_id desc;

-- Query for retrieving favorite referrals that were written for the specific user
SELECT written_from, person.username, person.email, person.phone_number, fill_referral.date_created, fill_referral.referral_body, fill_referral.aws_links, fill_referral.can_contact, fill_referral.favorite,  person.employer, person.position
FROM "new_request" 
LEFT JOIN "fill_referral" ON "new_request"."request_id" = "fill_referral"."new_request_id"
JOIN "person" ON "new_request"."written_from" = "person"."id"
WHERE "owned_by" = 4 and "completed" IS TRUE and "favorite" IS TRUE;

-- Query for retrieving reciprocal friendship
SELECT person.username, person.first_name, person.last_name, person.email
FROM "friendship" 
JOIN "person" ON "friendship"."friendA_id" = "person"."id"
WHERE "friendB_id" = 4
UNION
SELECT person.username, person.first_name, person.last_name, person.email
FROM "friendship" 
JOIN "person" ON "friendship"."friendB_id" = "person"."id"
WHERE "friendA_id" = 4;

-- Query for finding whether or not user (by email) exists
-- If the user's email exists, then it will send back the email address with the id.

SELECT id, email FROM person WHERE person.email LIKE 'action.jackson@gmail.com'
UNION ALL
SELECT NULL, NULL
FETCH FIRST 1 ROW ONLY;

-- inserts a new_request into DB
INSERT INTO "new_request" ("data_sent", "owned_by", "written_from", "request_body", "suggested_words")
VALUES ($1, $2, $3, $4, $5);

-- Query for gathering data about requests to fill
SELECT *
FROM "new_request"
JOIN "person" ON "new_request"."owned_by" = "person"."id" 
WHERE "written_from" = 6
AND "completed" = FALSE;

--Delete new_request by ID
DELETE FROM "new_request" 
WHERE request_id = $1;

-- Inserts fill_referral
INSERT INTO "fill_referral" ("referral_body", "date_created", "aws_links", "can_contact")
Values ($1, $2, $3, $4);

-- Change completeness of a new request
UPDATE "new_request" SET "completed" = true WHERE "request_id" = 12;