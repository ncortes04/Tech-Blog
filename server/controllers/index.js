const router = require('express').Router();

const { authMiddleware } = require('../utils/AUTH');
const {
    getAllPosts,
    getindividualPosts
} = require('./home-routes');

router.route('/getposts').get(getAllPosts);
router.route('/post:id').get(getindividualPosts)
module.exports = router;