const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models')

//this is the post route to create a comments
router.post('/', withAuth, async(req,res) =>{
    const commentData = await Comment.create({
      description: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    })
    res.json(commentData);
  })



  
module.exports = router;