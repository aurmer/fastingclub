
exports.up = function (knex) {
  return knex.raw(`
    ALTER TABLE zipcodes
    ALTER COLUMN number TYPE text;
  `)
}

exports.down = function (knex) {
  return knex.raw(`
    DELETE FROM zipcodes;

    ALTER TABLE zipcodes
    ALTER COLUMN number TYPE int USING (0);
  `)
}
