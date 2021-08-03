const { User } = require('../models');

const users = [{
        username: 'jvest',
        email: 'jvest@email.com',
        password: 'password1!'
    },
    {
        username: 'jvester',
        email: 'jvester@email.com',
        password: 'password2!'
    },
    {
        username: 'jvesterfelt',
        email: 'jvesterfelt@email.com',
        password: 'password3!'
    }
]

const seedUsers = () => User.bulkCreate(users, { individualHooks: true, returning: true });

module.exports = seedUsers;