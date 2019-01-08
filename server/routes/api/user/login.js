import express from 'express';
import User from 'models/User';

const router = express.Router();
const Joi = require('joi');

const schema = Joi.object()
  .keys({
    email: Joi.string().email(),
    password: Joi.string(),
    remember_me: Joi.any(),
  })
  .required();

router.post('/login', login);

async function login(req, res) {
  const result = Joi.validate(req.body, schema);
  const rememberMe = !!req.body.remember_me;

  if (result.error !== null) {
    return res.status(400).send(result.error);
  }

  try {
    const user = await User.login(req.body);

    if (rememberMe) {
      res.cookie('userId', user._id, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    } else {
      req.session.userId = user._id;
    }
  } catch (err) {
    res.status(400).send(err.message);
  }

  res.send('Successfullt logged in.');
}

module.exports = router;
