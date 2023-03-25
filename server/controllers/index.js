const router = require('express').Router();

const { authMiddleware } = require('../utils/AUTH');
const {
    getAllPosts,
    getindividualPosts,
    viewProfile
} = require('./home-routes');

router.route('/getposts').get(getAllPosts);
router.route('/viewprofile:id').get(viewProfile);
router.route('/post:id').get(getindividualPosts)
module.exports = router;