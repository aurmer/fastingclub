
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex.raw(`
    INSERT INTO users (
      fname,
      lname,
      email,
      zipcode
    )
    VALUES
    (
      'Aubrey',
      'Snider',
      'aubrey.snider@gmail.com',
      '77065'
    ),
    (
      'Chris',
      'Oakman',
      'chris.oakman@gmail.com',
      '77007'
    ),
    (
      'Andy',
      'Howard',
      'andy.howard@gmail.com',
      '77007'
    )
  `)
}
