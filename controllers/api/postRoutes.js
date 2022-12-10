const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');
//this is the post route to craete a post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
    
        res.status(200).json(newPost);
      } catch (err) {
        res.status(400).json(err);
      } 
});
//this deletes a post
router.delete('/:id', withAuth, async (req, res) => {
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
});
//this is getting the post by id
router.put('/:id', async (req, res) => {
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
});

module.exports = router;  