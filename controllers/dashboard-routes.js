const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blogpost, Comment } = require('../models');
const withAuth = require('../utils/auth');



router.get('/', withAuth, (req, res) => {
    Blogpost.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'post',
                'user_id'
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
            res.render('dashboard-pages/my-blogposts', { layout: "dashboard", posts, loggedIn: true, loggedInUser })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/', withAuth, (req, res) => {
    Comment.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'comment_text'],
            include: [{
                model: Blogpost,
                attributes: ['id', 'title', 'post', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        })
        .then(dbCommentData => {
            const comments = dbCommentData.map(comment => comment.get({ plain: true }));
            res.render('dashboard', { comments, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Blogpost.findByPk(req.params.id, {
            attributes: ['title', 'post'],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id']
            }]
        })
        .then(dbBlogpostData => {
            if (dbBlogpostData) {
                const posts = dbBlogpostData.get({ plain: true });

                res.render('edit-blogpost', {
                    post,
                    loggedIn: true
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Comment.findByPk(req.body.id, {
            attributes: ['comment_text'],
            include: [{
                model: Blogpost,
                attributes: ['title', 'post'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        })
        .then(dbCommentData => {
            if (dbCommentData) {
                const comment = dbCommentData.get({ plain: true });

                res.render('edit-comment', {
                    comment,
                    loggedIn: true
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router;