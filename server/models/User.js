const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { ObjectId } = require('bson')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,                
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    votes: [
      {
        video_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Video',          
        },
        vote: {
          type: Boolean,
          required: true
        }
      }
    ]
})

userSchema.pre('save', async function (next) {    
    const user = this
    if (user.isModified('password')) {        
        user.password = await bcrypt.hash(user.password, 8)        
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {    
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.addVoteVideo = async function(video, vote) {
  const user = this;  
  const updatedUser = await User.findOneAndUpdate(
    {
      _id: user._id.toString(),
    },
    {
      $pull: {
        votes : { video_id: video._id.toString() } 
      },
    },
  )  
  const voteVideo = { video_id: video._id.toString(), vote }      
  updatedUser.votes.push(voteVideo)    
  await updatedUser.save()    
  return updatedUser
}

userSchema.statics.findByCredentials = async (email, password) => {       
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Invalid login credentials')
    }            
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      throw new Error('Invalid login credentials')
    }

    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User