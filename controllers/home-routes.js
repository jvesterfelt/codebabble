const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blogpost, Comment } = require('../models');

// router.get('/', (req, res) => {
//     if (req.session.loggedIn) {
//         res.redirect('/');
//     }
//     res.render('homepage', {
//         loggedIn: req.session.loggedIn
//     })
// });

router.get('/', (req, res) => {
    Blogpost.findAll({
            attributes: [
                'id',
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

            if (req.session.user_id) {
                const loggedInUser = { user_id: req.session.user_id }
                loggedIn = true;
                res.render('homepage', { layout: 'main', posts, loggedInUser, loggedIn })
            } else {
                loggedIn = false;
                res.render('homepage', { layout: 'main', posts, loggedIn });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/post/:id', (req, res) => {
    Blogpost.findByPk(req.params.id, {
            attributes: [
                'id',
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
            if (dbBlogpostData) {
                const postData = dbBlogpostData.get({ plain: true });

                if (req.session.user_id) {
                    const loggedInUser = { user_id: req.session.user_id }
                    loggedIn = true;
                    res.render('home-pages/single-blogpost', { layout: 'main', postData, loggedInUser, loggedIn })
                } else {
                    loggedIn = false;
                    res.render('home-pages/single-blogpost', { layout: 'main', postData, loggedIn });
                }
            } else {
                res.status(404).end();
            }
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