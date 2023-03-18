const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

require('../database/connection');
var userSchema = require('../model/userSchema');

router.post('/register', async (req, res) => {
  const { name, email, phone, college, password, cpassword } = req.body;
  if (!name || !email || !phone || !college || !password || !cpassword) {
    return res.status(422).json({ error: 'Plz filled the field properly' });
  }
  try {
    const userExist = await userSchema.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: 'Email already Exist' });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: 'Email already Exist' });
    } else {
      const user = new userSchema({ name, email, phone, college, password, cpassword });
      await user.save();
      res.status(201).json({ message: 'user registered successfuly' });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: 'Plz filled the field properly' });
    }
    const userLogin = await userSchema.findOne({ email });

    console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        return res.status(422).json({ error: 'Invalid credential pass' });
      } else {
        res.status(201).json({ message: 'user signin successfuly' });
      }
    } else {
      res.status(422).json({ error: 'Invalid credential' });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
