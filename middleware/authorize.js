const { expressjwt: jwt } = require("express-jwt");
const { secret } = require('config.json');
const User = require('./../models/user')

function authorize() {
  return [
    jwt({ secret, algorithms: ['HS256'] }),

    async (req, res, next) => {
      const user = await User.findByPk(req.auth.sub);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.user = user.get();
      next();
    }
  ]
}

module.exports = authorize;