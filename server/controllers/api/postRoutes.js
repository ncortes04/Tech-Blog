const router = require('express').Router();
const { Post, User } = require('../../models');
//this is the post route to craete a post
module.exports = {
  async createPost({ body, user = null, params}, res) {
    try {
      const foundUser = await User.findOne({ where: { email: user.email } })
      const newPost = await Post.create({
          ...body,
          user_id: foundUser.id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      console.error(err)
      res.status(400).json(err);
    } 
  },
  //this deletes a post
  async deletePost({ body, user = null, params} , res) {
    try {
      const foundUser = await User.findOne({ where: { email: user.email } })
      if (!foundUser) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }

      const userData = await Post.destroy({
        where: {
          id: body.id,
        },
      });
      
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
