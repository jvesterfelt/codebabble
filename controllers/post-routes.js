const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blogpost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/:id', withAuth, (req, res) => {});





module.exports = router;