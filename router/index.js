const { Router } = require('express');
const { body } = require('express-validator');
const userController = require('../controller/user-controller');

const router = new Router();

const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ max: 32, min: 3 }),
  userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;
