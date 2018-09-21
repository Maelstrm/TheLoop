
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
    "phone_number" integer NOT NULL,
    "Referred By" integer NOT NULL,
    "joined_date" DATE NOT NULL,
    "total_req_left" integer NOT NULL DEFAULT '5',
    "total_req_given" integer NOT NULL DEFAULT '0'
);



CREATE TABLE "new_Request" (
    "request_id" serial NOT NULL,
    "date_sent" DATE NOT NULL,
    "requested_by" integer NOT NULL,
    "request_body" varchar(420) NOT NULL,
    "suggested_words" varchar(200) NOT NULL,
    CONSTRAINT new_Request_pk PRIMARY KEY ("request_id")
);



CREATE TABLE "industries" (
    "industry_id" serial NOT NULL,
    "industry_name" varchar(100) NOT NULL,
    CONSTRAINT industries_pk PRIMARY KEY ("industry_id")
);



CREATE TABLE "friendship" (
    "friendA_id" varchar(50) NOT NULL,
    "friendB_id" varchar(50) NOT NULL,
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
    "request_Id" integer NOT NULL,
    "referral_body" varchar(420) NOT NULL,
    "referral_author" integer NOT NULL,
    "date_created" DATE NOT NULL,
    "aws_links" varchar NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT 'FALSE',
    "can_contact" BOOLEAN NOT NULL DEFAULT 'TRUE'
);


