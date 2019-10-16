
exports.up = function(knex) {

  CREATE TABLE "users"
  (
   "id"    serial NOT NULL,
   "fname" text NOT NULL,
   "lname" text NOT NULL,
   "email" text NOT NULL

  );

  CREATE UNIQUE INDEX "PK_users" ON "users"
  (
   "id"
 );

  CREATE TABLE "fastEvents"
  (
   "id"          serial NOT NULL,
   "name"        text NOT NULL,
   "zipcode"     integer NOT NULL,
   "startdate"   date NOT NULL,
   "enddate"     date NOT NULL,
   "description" text NOT NULL,
   CONSTRAINT "FK_156" FOREIGN KEY ( "zipcode" ) REFERENCES "zipcodes" ( "number" )
  );

  CREATE UNIQUE INDEX "PK_fast_events" ON "fastEvents"
  (
   "id"
  );

  CREATE INDEX "fkIdx_156" ON "fastEvents"
  (
   "zipcode"
  );

  CREATE TABLE "zipcodes"
  (
   "number"        integer NOT NULL,
   "deg_latitude"  real NOT NULL,
   "deg_longitude" real NOT NULL

  );

  CREATE UNIQUE INDEX "PK_zipcode" ON "zipcodes"
  (
   "number"
  );

  CREATE TABLE "users_fastEvents_join"
  (
   "id_user"      serial NOT NULL,
   "id_fastEvent" serial NOT NULL,
   "archived"     boolean NOT NULL,
   "is_owner"     boolean NOT NULL,
   CONSTRAINT "FK_170" FOREIGN KEY ( "id_user" ) REFERENCES "users" ( "id" ),
   CONSTRAINT "FK_173" FOREIGN KEY ( "id_fastEvent" ) REFERENCES "fastEvents" ( "id" )
  );

  CREATE INDEX "fkIdx_170" ON "users_fastEvents_join"
  (
   "id_user"
  );

  CREATE INDEX "fkIdx_173" ON "users_fastEvents_join"
  (
   "id_fastEvent"
  );
};

exports.down = function(knex) {
  DROP TABLE "users_fastEvents_join";
  DROP TABLE "users";
  DROP TABLE "fastEvents";
  DROP TABLE "zipcodes";
};
