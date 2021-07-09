const { User } = require('../models');

const userData = [
{
    name: "Xandromus",
    password: "pw1234"
    },
    {
    name: "Sal",
    password: "pw1234"
    },
    {
    name: "Lernantino",
    password: "pw1234"
    },
    {
    name: "Amiko",
    password: "pw1234"
    }    
];

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});


module.exports = seedUsers;
