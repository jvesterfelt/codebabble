const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blogpost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/:id', withAuth, (req, res) => {
    Blogpost.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'post',
                'user_id'
            ],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at', [sequelize.literal("(SELECT username FROM user where user.id = blogpost.user_id)"), 'username']],
            }]
        })
        .then(dbPostData => {
            const postData = dbPostData.get({ plain: true })

            console.log('postData', postData);

            const loggedInUser = { user_id: req.session.user_id }
            if (!dbPostData) {
                res.status(404).json({ message: 'No posting found with that ID' });
                return;
            }
            res.render('dashboard-pages/single-blogpost', {
                layout: 'dashboard',
                postData,
                loggedInUser,
                loggedIn: true
            })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
});

module.exports = router;