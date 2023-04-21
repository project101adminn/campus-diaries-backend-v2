const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

require('../database/connection');
const userSchema = require('../model/userSchema');

router.post('/register', async (req, res) => {
  console.log(req.body);
  const { name, email, phone, college, password } = req.body;
  if (!name || !email || !phone || !college || !password) {
    return res.status(422).json({ error: 'Plz filled the field properly' });
  }
  try {
    const userExist = await userSchema.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: 'Email already Exist' });
    } else {
      const user = new userSchema({ name, email, phone, college, password });
      await user.save();
      res.status(201).json({ message: 'user registered successfully' });
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
      const token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie('mytoken', token, {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });
      if (!isMatch) {
        return res.status(422).json({ error: 'Invalid credential pass' });
      } else {
        res.status(201).json({ message: 'user sign in successfully' });
      }
    } else {
      res.status(422).json({ error: 'Invalid credential' });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
