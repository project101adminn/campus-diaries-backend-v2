const bcrypt = require('bcryptjs');
const BigPromise = require('../middlewares/BigPromise.js');
const User = require('../models/userSchema.js');

const registerStudent = BigPromise(async (req, res, next) => {
  // TODO : What to do with Contact?
  let { name, email, department, role, id, password, confirmPassword } = req.body;

  if (!name || !email || !department || !role || !id || !password || !confirmPassword) {
    res.status(400).json({
      message: 'Enter All the Required Details...',
    });
  }

  if (password != confirmPassword) {
    res.status(404).json({
      message: 'Passwords do not match!!',
    });
  }
  password = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password,
    id,
    role,
    department,
  });

  user.save((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: err.message,
      });
    }
    return res.status(201).json(user);
  });
});

module.exports = { registerStudent };
