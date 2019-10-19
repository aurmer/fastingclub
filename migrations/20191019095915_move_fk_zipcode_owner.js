
exports.up = function (knex) {
  return knex.raw(`
    ALTER TABLE "fastEvents"
      ADD COLUMN owner       serial NOT NULL,
      ADD COLUMN archived    boolean NOT NULL DEFAULT false,
      ADD COLUMN geo_locked  boolean NOT null,
      ADD CONSTRAINT "FK_188" FOREIGN KEY ( "owner" ) REFERENCES "users" ( "id" );

    CREATE INDEX "fkIdx_188" ON "fastEvents" ( "owner" );

    DROP INDEX "fkIdx_181";

    ALTER TABLE "fastEvents"
      DROP CONSTRAINT "FK_181";

    ALTER TABLE "fastEvents"
      DROP COLUMN zipcode;

    ALTER TABLE "users_fastEvents_join"
      DROP COLUMN is_owner;

    ALTER TABLE "users_fastEvents_join"
      DROP COLUMN archived;

    ALTER TABLE users
      ADD COLUMN zipcode serial NOT NULL,
      ADD CONSTRAINT "FK_184" FOREIGN KEY ( "zipcode" ) REFERENCES "zipcodes" ( "id" );

    CREATE INDEX "fkIdx_184" ON "users" ( "zipcode" );
    `)
}

exports.down = function (knex) {
  return knex.raw(`
    DROP INDEX "fkIdx_184";

    ALTER TABLE users
      DROP CONSTRAINT "FK_184",
      DROP COLUMN zipcode;

    ALTER TABLE "users_fastEvents_join"
      ADD COLUMN archived boolean NOT NULL;

    ALTER TABLE "users_fastEvents_join"
      ADD COLUMN is_owner boolean NOT NULL;

    ALTER TABLE "fastEvents"
      ADD COLUMN zipcode serial NOT NULL,
      ADD CONSTRAINT "FK_181" FOREIGN KEY ( "zipcode" ) REFERENCES "zipcodes" ( "id" );

    CREATE INDEX "fkIdx_181" ON "fastEvents" ( "zipcode" );

    DROP INDEX "fkIdx_188";

    ALTER TABLE "fastEvents"
      DROP COLUMN owner,
      DROP COLUMN archived,
      DROP COLUMN geo_locked;
  `)
}
