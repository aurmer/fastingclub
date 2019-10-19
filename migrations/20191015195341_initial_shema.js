
exports.up = function (knex) {
  return knex.raw(

    `

    CREATE TABLE "zipcodes"
    (
     "id"            serial NOT NULL,
     "number"        int NOT NULL,
     "deg_longitude" real NOT NULL,
     "deg_latitude"  real NOT NULL

    );

    CREATE UNIQUE INDEX "PK_zipcode" ON "zipcodes"
    (
     "id"
    );

    CREATE TABLE "fastEvents"
    (
     "id"          serial NOT NULL,
     "name"        text NOT NULL,
     "startdate"   date NOT NULL,
     "enddate"     date NOT NULL,
     "description" text NOT NULL,
     "zipcode"     serial NOT NULL,
     CONSTRAINT "FK_181" FOREIGN KEY ( "zipcode" ) REFERENCES "zipcodes" ( "id" )
    );

    CREATE UNIQUE INDEX "PK_fast_event" ON "fastEvents"
    (
     "id"
    );

    CREATE INDEX "fkIdx_181" ON "fastEvents"
    (
     "zipcode"
    );


    CREATE TABLE "users"
    (
     "id"    serial NOT NULL,
     "fname" text NOT NULL,
     "lname" text NOT NULL,
     "email" text NOT NULL

    );

    CREATE UNIQUE INDEX "PK_user" ON "users"
    (
     "id"
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

    `)
}

exports.down = function (knex) {
  return knex.raw(`
    DROP TABLE "users_fastEvents_join";
    DROP TABLE "fastEvents";
    DROP TABLE "users";
    DROP TABLE "zipcodes";
  `)
}
