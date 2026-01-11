const { validationResult } = require('express-validator');
const Post = require('../models/Post');

const getNewMessage = (req,res) => {
    res.render('new-message');
};

const postNewMessage = async (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const { title, content } = req.body;

    await Post.createPost(title,content, req.user.id);
    res.redirect('/');
}

module.exports = {
    getNewMessage,
    postNewMessage,
};