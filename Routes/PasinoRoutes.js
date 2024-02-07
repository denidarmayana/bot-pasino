const express = require('express');
const router = express.Router();
const Pasino = require('../Controllers/PasinoControllers')

router.post('/auth',  Pasino.Login);
router.post('/register',  Pasino.Register);
router.post('/token',  Pasino.Token);
router.post('/deposit',  Pasino.Deposit);
router.post('/withdraw',  Pasino.Withdraw);
router.post('/transfer',  Pasino.Transfer);
router.post('/auths',  Pasino.Auth);

module.exports = router;