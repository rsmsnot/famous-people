const pg = require("pg");
const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: settings
});

const firstName = process.argv.slice(2)[0];

console.log('Searching ...');

knex.select('*')
  .from('famous_people')
  .where('first_name', firstName)
  .asCallback((err, rows) => {
    if (err) {
      console.log('Error:', err);
      return;
    }
    let person = 1;
    rows.forEach(result => {
      console.log(`${person}: ${result.first_name} ${result.last_name}, born '${result.birthdate.toLocaleDateString()}'`);
      person++;
    });
    knex.destroy();
  });