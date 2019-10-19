
exports.up = function (knex) {
  return knex.raw(`

    ALTER TABLE "users"
      DROP COLUMN zipcode;

    ALTER TABLE "zipcodes"
      DROP COLUMN id;

    ALTER TABLE "zipcodes"
      ADD PRIMARY KEY (number);
      
    ALTER TABLE users
      ADD COLUMN zipcode text NOT NULL,
      ADD CONSTRAINT "FK_184" FOREIGN KEY ( "zipcode" ) REFERENCES "zipcodes" ( "number" );

    CREATE INDEX "fkIdx_184" ON "users" ( "zipcode" );
  `)
}

exports.down = function (knex) {
  return knex.raw(`

    DROP INDEX "fkIdx_184";

    ALTER TABLE users
      DROP COLUMN zipcode;

    ALTER TABLE "zipcodes"
      DROP CONSTRAINT "zipcodes_pkey";

    ALTER TABLE "zipcodes"
      ADD COLUMN id serial PRIMARY KEY;

    ALTER TABLE "users"
      ADD COLUMN zipcode serial NOT NULL,
      ADD CONSTRAINT "FK_184" FOREIGN KEY ( "zipcode" ) REFERENCES "zipcodes" ( "id" );
  `)
}
