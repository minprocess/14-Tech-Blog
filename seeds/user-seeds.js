const { User } = require('../models');

const userData = [
{
    name: "Xandromus",
    password: "pw123"
    },
    {
    name: "Sal",
    password: "pw123"
    },
    {
    name: "Lernantino",
    password: "pw123"
    },
    {
    name: "Amiko",
    password: "pw123"
    }    
];

const seedUsers = () => User.bulkCreate(userData);


module.exports = seedUsers;
