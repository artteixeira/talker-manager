const express = require('express');
const generateRandomToken = require('../utils/loginUtils');
const validatePassword = require('../middlewares/validatePassword');
const validateEmail = require('../middlewares/validateEmail');

const router = express.Router();

router.post('/', validatePassword, validateEmail, async (req, res) => {
  const randomToken = generateRandomToken(16);
  res.status(200).json({ token: randomToken });
});

module.exports = router;