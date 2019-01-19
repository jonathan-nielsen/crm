import express from 'express';
import debug from 'debug';
import User from 'models/User';

const router = express.Router();
const Joi = require('joi');

const schema = Joi.object()
  .keys({
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*]{6,30}$/),
    confirm_password: Joi.any()
      .valid(Joi.ref('password'))
      .options({
        language: {
          any: {
            allowOnly: 'must match password',
          },
        },
      })
      .required(),
  })
  .required();

router.post('/', register);

async function register(req, res) {
  global.log.route(`${req.method} ${req.originalUrl}`);

  const result = Joi.validate(req.body, schema);

  if (result.error !== null) {
    return res.status(500).send(result.error.message);
  }

  try {
    const user = await User.create(req.body);
    req.session.userId = user._id;

    res.send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

module.exports = router;
