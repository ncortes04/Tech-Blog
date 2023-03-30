const { Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');
//this is the ge route to get all the users
module.exports = {
  async getAllPosts(req, res){
    try {
      const common = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['name', 'id']
          },
          {
            model: Comment
          }
        ]
      });
      res.status(200).json(common)
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getindividualPosts(req, res) {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include:[
          {model: Comment,
              include:[{model: User,
                attributes: ['name', 'id']
              }]
          },{
            model: User,
            attributes: ['name']
          }],
      });
      const post = postData.get({ plain: true });
      
      res.status(200).json(post)
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async viewProfile(req, res) {
    try {
      const profileData = await User.findByPk(req.params.id, {attributes: ['name'],
        include:[
          {model: Post,}]
      });
      
      res.status(200).json(profileData)
    } catch (err) {
      res.status(500).json(err);
    }
  }
}