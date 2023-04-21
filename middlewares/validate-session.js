const jwt = require('jsonwebtoken');
const userSchema = require('../model/userSchema');

const validateSession = async (req, res, next) => {
  console.log(req.path);
  if (req.path === '/admin/register' || req.path === '/admin/signin') {
    next();
  } else {
    try {
      const token = req.cookies.mytoken;
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

      const rootUser = await userSchema.findOne({ _id: verifyToken._id, 'tokens.token': token });

      if (!rootUser) {
        throw new Error('User not found');
      }

      req.token = token;
      req.rootUser = rootUser;
      req.userId = rootUser._id;

      next();
    } catch (error) {
      res.status(401).send('Unauthorized: No token provided');
    }
  }
};

module.exports = validateSession;
