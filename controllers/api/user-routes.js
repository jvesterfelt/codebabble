const router = require('express').Router();
const { User, Blogpost, Comment } = require('../../models');
const { passwordStrength } = require('check-password-strength');


// Get all users
router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['password'] },
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Get specific user by id
router.get('/:id', (req, res) => {
    User.findOne({
            where: {
                id: req.params.id
            },
            attributes: { exclude: ['password'] },
            include: [{
                    model: Blogpost,
                    attributes: ['title', 'post', 'user_id'],
                    as: 'posts',
                    include: {
                        model: Comment,
                        attributes: ['comment_text', 'user_id', 'post_id'],
                        as: 'comments'
                    }
                },
                {}
            ]
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {

    User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            res.status(500).json(err.errors);
            console.log(err.errors);
        });
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
            inidividualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(dbUserData => {

            if (!dbUserData) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const validPassword = dbUserData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Invalid password' });
                return;
            }

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: 'Logged in!' });
            })
        })
        .catch(err => {
            console.log(err)
        })
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.post('/password', (req, res) => {
    const strength = passwordStrength(req.body.password, [{
            id: 0,
            value: "Invalid",
            minDiversity: 0,
            minLength: 0
        },
        {
            id: 1,
            value: "Weak",
            minDiversity: 3,
            minLength: 6
        },
        {
            id: 2,
            value: "Good",
            minDiversity: 3,
            minLength: 10
        },
        {
            id: 3,
            value: "Strong",
            minDiversity: 4,
            minLength: 12
        }
    ]);
    res.json(strength);
});

module.exports = router;