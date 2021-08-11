const { Blogpost } = require('../models');

const blogposts = [{
        title: 'This is a title to a blogpost',
        post: 'This is the text of the blogpost!',
        user_id: 3
    },
    {
        title: 'This is a title to a blogpost',
        post: 'This is the text of the blogpost!',
        user_id: 2
    },
    {
        title: 'This is a title to a blogpost',
        post: 'This is the text of the blogpost!',
        user_id: 1
    }
]


const seedBlogposts = () => Blogpost.bulkCreate(blogposts);

module.exports = seedBlogposts;