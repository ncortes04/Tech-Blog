const router = require('express').Router();
const isAuth = require('../../utils/auth')
const {
    createUser,
    login,
    logout
} = require('./userRoutes');
const {
    createPost,
    deletePost,
    updatePost
} = require('./postRoutes');
const { addComment } = require('./commentRoutes')

router.route('/comment').post(isAuth, addComment)
router.route('/post').post(isAuth, createPost)
router.route('/login').post(login)
router.route('/signup').post(createUser);


module.exports = router;
