const { Comment, User } = require('../../models')

module.exports = {
  async addComment({ body, user = null, params}, res){
    const foundUser = await User.findOne({ where: { email: user.email } })
    try {
      const commentData = await Comment.create({
        description: body.description,
        user_id: foundUser.id,
        post_id: body.id,
      })
      res.json(commentData);
    } catch(err) {
      console.error(err)
    }
  },
  async deleteComment({body, user = null, params}, res) {
    try {
      const foundUser = await User.findOne({ where: { email: user.email } })
      if (!foundUser) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }

      const commentData = await Comment.destroy({
        where: {
          id: body.id,
        },
      });
      
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
//this is the post route to create a comments