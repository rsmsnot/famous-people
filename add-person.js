const settings = require('./settings');
const knex = require('knex')({
    client: 'pg',
    connection: settings
});

const firstName = process.argv[2];
const lastName = process.argv[3];
const dateOfBirth = process.argv[4];

knex('famous_people').insert({
    first_name: firstName,
    last_name: lastName,
    birthdate: dateOfBirth
})
    .then((result) => {
        console.log("Inserting data")
        console.log(result);
    })
    .catch(err => { throw err; })
    .finally(() => { knex.destroy(); 
    });