const { User } = require('../models');

const userData = [
{
    name: "Xandromus",
    email: "xandromus@hotmail.com",
    password: "password12345"
    },
    {
    name: "Sal",
    email: "sal@hotmail.com",
    password: "password12345"
    },
    {
    name: "Lernantino",
    email: "lernantino@gmail.com",
    password: "password12345"
    },
    {
    name: "Amiko",
    email: "amiko2k20@aol.com",
    password: "password12345"
    }    
];

try {
    const seedUsers = () => User.bulkCreate(userData);
}
catch (err) {
    console.log("User.bulkCreate err");
    console.log(err);
    process.exit(0);
  }

module.exports = seedUsers;
