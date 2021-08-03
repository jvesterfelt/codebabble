const User = require('./User');
const Comment = require('./Comment');
const Blogpost = require('./Blogpost');


Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Blogpost, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

Blogpost.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.hasMany(Blogpost, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Blogpost.hasMany(Comment, {
    foreignKey: 'post_id'
})


module.exports = { User, Comment, Blogpost };