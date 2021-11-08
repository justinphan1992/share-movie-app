const express = require('express')
const { User } = require('../models')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/login', async (req, res) => {    
  try {
      const { email, password } = req.body
                  
      const user = await User.exists({ email }) 
        ? await User.findByCredentials(email, password)       
        : await new User({ email, password }).save()

      if (!user) {
        return res.status(401).send({error: 'Login failed! Check authentication credentials'})
      }    

      const token = await user.generateAuthToken()
      res.send({ token })
  } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.toString() })
  }
})

router.post('/logout', auth, async(req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.tokens = user.tokens.filter((token) => {
        return token.token !== req.token
    })    
    await user.save()
    res.send()
  } catch (error) {      
      res.status(500).send({error: error.toString()})
  }
})

router.get('/me', auth, async(req, res) => {  
  res.send(req.user)
})

module.exports = router;