const jwt = require('jsonwebtoken')

module.exports = {
    authMiddleware: function (req, res, next) {
        // allows token to be sent via  req.query or headers
        let token = req.query.token || req.headers.authorization;
        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
          token = token.split(' ').pop().trim();
        }
    
        if (token === 'null') {
          return res.status(400).json({ message: 'You have no token!' });
        }
    
        // verify token and get user data out of it
        try {
          const { data } = jwt.verify(token, "secret");
          req.user = data;
        } catch {
          console.log('Invalid token');
          return res.status(400).json({ message: 'invalid token!' });
        }
    
        // send to next endpoint
        next();

    },
    async signToken({id, name, password, email}){
        const payload = {id, name, password, email}
        return await jwt.sign({data: payload}, 'secret')
    }
}