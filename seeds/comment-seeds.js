const { Comment } = require('../models');

const comments = [{
        comment_text: 'This is some text for a comment.',
        user_id: 1,
        post_id: 3
    },
    {
        comment_text: 'This is some text for a comment.',
        user_id: 2,
        post_id: 3
    },
    {
        comment_text: 'This is some text for a comment.',
        user_id: 3,
        post_id: 1
    },
    {
        comment_text: 'This is some text for a comment.',
        user_id: 1,
        post_id: 3
    },
    {
        comment_text: 'This is some text for a comment.',
        user_id: 2,
        post_id: 1
    },
    {
        comment_text: 'This is some text for a comment.',
        user_id: 3,
        post_id: 1
    },
    {
        comment_text: 'This is some text for a comment.',
        user_id: 1,
        post_id: 2
    }
]

const seedComments = () => Comment.bulkCreate(comments);

module.exports = seedComments;