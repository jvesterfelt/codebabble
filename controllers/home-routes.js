const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blogpost, Comment } = require('../models');

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
    }
    res.render('homepage', {
            loggedIn: req.session.loggedIn
        })
        // .catch(err => {
        //     console.log(err);
        //     res.status(500).json(err);
        // });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    }
    res.render('login', { layout: "blank" });
});

router.get('/signup', (req, res) => {
    res.render('signup', { layout: "blank" })
        // .catch(err => {
        //     console.log(err);
        //     res.status(500).json(err);
        // });
});

module.exports = router;