const express = require('express');
const router = express.Router();

require('../database/connection');
var userSchema = require('../model/userSchema');

router.post('/register', async (req, res) => {});

module.exports = router;
