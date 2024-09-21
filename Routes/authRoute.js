const express = require('express')

const router = express.Router();

const { signupController, loginController,getuserController } = require('../Controllers/auth')

router.post('/signup', signupController)
router.post('/login', loginController)
router.get('/getuser',getuserController)

module.exports = router;