import express from 'express';

const router = express.Router();

router.get('/logout', logout);

function logout(req, res, next) {
	if (req.cookies.userId) {
		res.clearCookie('userId');
	}

	if (req.session) {
		req.session.destroy(err => (err ? next(err) : res.redirect('/')));
	}
}

module.exports = router;
