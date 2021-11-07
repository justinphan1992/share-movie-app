const express = require('express')
const { User } = require('../models')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()    
    res.status(201).send({ success: true })
  } catch (error) {
      res.status(400).send(error)
  }
})

router.post('/login', async (req, res) => {    
  try {
      const { email, password } = req.body
      const user = await User.findByCredentials(email, password)
      if (!user) {
          return res.status(401).send({error: 'Login failed! Check authentication credentials'})
      }
      const token = await user.generateAuthToken()
      res.send({ token })
  } catch (error) {
      console.log(error);
      res.status(400).send(error)
  }
})

router.post('/logout', auth, async(req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token != req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
      res.status(500).send(error)
  }
})

router.get('/me', auth, async(req, res) => {  
  res.send(req.user)
})

module.exports = router;