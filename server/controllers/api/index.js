const router = require('express').Router();
const {authMiddleware} = require('../../utils/AUTH')
const {
    createUser,
    login,
    getSingleUser,
} = require('./userRoutes');
const {
    createPost,
    deletePost,
    updatePost,
} = require('./postRoutes');
const { addComment,deleteComment } = require('./commentRoutes')


router.route('/login').post(login)
router.route('/signup').post(createUser);
router.route('/comment').post(authMiddleware, addComment).delete(authMiddleware, deleteComment);
router.route('/createpost').post(authMiddleware, createPost);
router.route('/me').get(authMiddleware, getSingleUser)
router.route('/deletepost').delete(authMiddleware, deletePost)

module.exports = router;
