const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models')

module.exports = {
  async addComment(req, res){
    console.log('hit the target')
    const commentData = await Comment.create({
      description: req.body.description,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    })
    res.json(commentData);
  }
}
//this is the post route to create a comments