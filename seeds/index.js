const seedBlogposts = require('./blogpost-seeds');
const seedComments = require('./comment-seeds');
const seedUsers = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    console.log('=============');
    await seedUsers();
    sconsole.log('=============');
    await seedBlogposts();
    console.log('=============');
    await seedComments();


    process.exit(0);
};

seedAll();