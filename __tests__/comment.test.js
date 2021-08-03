const { expect } = require('@jest/globals');
const sequelize = require('sequelize');
const { Comment } = require('../models');

test('Check that comments are valid', async() => {
    const comment = {
        comment_text: "Make sure that my comments are working",
        user_id: 1,
        post_id: 1
    }
    const newComment = Comment.build(comment);
    const validatedComment = await newComment.validate();
    console.log(validatedComment);
    return expect(validatedComment).toBeDefined();
});

test('Creates a comment using the Comment Model', () => {
    const comment = {
        comment_text: "Make sure that my comments are working",
        user_id: 1,
        post_id: 1
    }
    const newComment = Comment.build(comment);

    return expect(newComment).toBeInstanceOf(Comment);
});