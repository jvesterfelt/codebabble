const { expect } = require('@jest/globals');
const sequelize = require('sequelize');
const { Blogpost } = require('../models');

test('Check for valid blogpost', async() => {
    const blogpost = {
        title: "My test blogpost",
        post: "This is the text within my blogpost.",
        user_id: 1
    }

    const newBlogpost = Blogpost.build(blogpost);
    const validatedBlogpost = await newBlogpost.validate();
    console.log(validatedBlogpost);
    return expect(validatedBlogpost).toBeDefined();
});

test('Creates an instance of a blogpost', () => {
    const blogpost = {
        title: "My test blogpost",
        post: "This is the text within my blogpost.",
        user_id: 1
    }

    const newBlogpost = Blogpost.build(blogpost);
    return expect(newBlogpost).toBeInstanceOf(Blogpost);
});