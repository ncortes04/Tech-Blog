const router = require('express').Router();
const { Post, User } = require('../../models');
//this is the post route to craete a post
module.exports = {
  async createPost(req, res) {
    try {
      const newPost = await Post.create({
          ...req.body,
          user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    } 
  },
  //this deletes a post
  async deletePost(req, res) {
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
  
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updatePost(req, res) {
    try {
      const postData = await Post.update(req.body,(
        {
          where: {
            id: req.params.id
          },
        })
      )
      res.status(200).json(postData)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
