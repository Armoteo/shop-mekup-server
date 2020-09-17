const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'incorrect email').isEmail(),
    check('password', 'incorrect password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return req.status(400).json({
          errors: errors.array(),
          message: 'incorrect email or password'
        })
      }

      const { email, password } = req.body

      // search user whit this email
      const newUser = await User.findOne({ email: email })
      if (newUser) {
        return res.status(400).json({ message: 'The user is already registered' })
      }
      //secret password, create and save new user
      const adminStatus = email === 'armoteo@ukr.net' ? true : false
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email: email, password: hashedPassword, adminStatus: adminStatus })
      await user.save()

      res.status(201).json({ message: 'User created' })
    } catch (e) {
      res.status(500).json({ message: 'Error API' })
    }
  })
// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'incorrect email').normalizeEmail().isEmail(),
    check('password', 'incorrect password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return req.status(400).json({
          errors: errors.array(),
          message: 'incorrect login'
        })
      }

      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }
      // @ts-ignore
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '24h' }
      )
      res.json({ token: token, userId: user.id, adminStatus: user.adminStatus })
    } catch (e) {
      res.status(500).json({ message: 'Error login' })
    }
  })

module.exports = router
