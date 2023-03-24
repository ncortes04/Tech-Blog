const { User, Post } = require('../../models');
const { signToken } = require('../../utils/AUTH')

//create new user
module.exports = {
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);

      const token = await signToken(userData)

      res.status(200).json({token})
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  }, 
  async login(req, res) {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const token = await signToken(userData)
      console.log(userData)
      res.status(200).json({token})

    } catch (err) {
      res.status(400).json(err);
    }
  },
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({ where: { email: user.email } ,include:[
      {model: Post}
    ]
    });
    
    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }
    res.json({foundUser})
},

}