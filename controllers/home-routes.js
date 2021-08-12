const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blogpost, Comment } = require('../models');

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    }
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    })
});

router.get('/', (req, res) => {
    Blogpost.findAll({
            attributes: [
                'title',
                'post',
                'user_id',
                'created_at'
            ],
            include: [{
                model: Comment,
                attributes: ['comment_text', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        })
        .then(dbBlogpostData => {
            const posts = dbBlogpostData.map(post => post.get({ plain: true }));
            console.log(posts)
            const loggedInUser = { user_id: req.session.user_id }
            res.render('homepage', { layout: "homepage", posts })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    }
    res.render('login', { layout: "blank" });
});

router.get('/signup', (req, res) => {
    res.render('signup', { layout: "blank" })
});

module.exports = router;