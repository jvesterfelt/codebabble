const { expect } = require('@jest/globals');
const sequelize = require('sequelize');
const { User } = require('../models');

test('Checks that created user is valid', async() => {
    const user = {
        username: 'jvesterfelt',
        email: 'jamievesterfelt@email.com',
        password: 'password1!'
    }

    const newUser = User.build(user);
    const validatedUser = await newUser.validate();
    console.log(validatedUser);
    return expect(validatedUser).toBeDefined();
});

test('Creates an instance of the User model', () => {
    const user = {
        username: 'jvesterfelt',
        email: 'jamievesterfelt@email.com',
        password: 'password1!'
    }

    const newUser = User.build(user);
    return expect(newUser).toBeInstanceOf(User);
});