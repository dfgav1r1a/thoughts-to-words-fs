const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.get('/signup', userController.userSignup);

router.get('/login', userController.userLogin);

module.exports = router;