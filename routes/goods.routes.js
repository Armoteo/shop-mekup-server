const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const Goods = require('../models/Goods')
const router = Router()

// /api/goods/all
router.get(
  '/all',
  async (res, req) => {
    try {
      const listGoods = await Goods.find()
    } catch (e) {
      res.status(500).json({ message: 'Error get All' })
    }
  })

// /api/goods/addGoods  - admin
router.post(
  '/addGoods',
  async (req, res) => {
    try {
      const tokkenArray = req.headers.authorization.split(" ")
      if (tokkenArray[0] === 'Bearer') {
        const tokken = tokkenArray[1]
        if (jwt.verify(tokken, config.get('jwtSecret'))) {
          const objTokken = jwt.decode(tokken)
        }
      }
    } catch (e) {
      res.status(500).json({ message: 'Error login' })
    }
  })

module.exports = router