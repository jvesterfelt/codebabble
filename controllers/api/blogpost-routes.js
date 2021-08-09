const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Blogpost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log('======================');
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
                    attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbBlogpostData => res.json(dbBlogpostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Blogpost.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'post',
                'user_id',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbBlogpostData => {
            if (!dbBlogpostData) {
                res.status(404).json({ message: 'Blogpost not found' });
                return;
            }
            res.json(dbBlogpostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Blogpost.create({
            title: req.body.title,
            post: req.body.post_url,
            user_id: req.session.user_id
        })
        .then(dbBlogpostData => res.json(dbBlogpostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Blogpost.update({
            title: req.body.title
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(dbBlogpostData => {
            if (!dbBlogpostData) {
                res.status(404).json({ message: 'Blogpost not found' });
                return;
            }
            res.json(dbBlogpostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Blogpost.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbBlogpostData => {
            if (!dbBlogpostData) {
                res.status(404).json({ message: 'Blogpost not found' });
                return;
            }
            res.json(dbBlogpostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;