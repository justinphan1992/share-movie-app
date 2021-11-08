const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2");

const videoSchema = mongoose.Schema({
  youtube_id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  up_vote: {
    type: Number,
    default: 0,
  },
  down_vote: {
    type: Number,
    default: 0,
  },
  shared_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true
})

videoSchema.plugin(mongoosePaginate);

videoSchema.pre('save', async function (next) {    
  const video = this
  if (video.up_vote < 0){
    video.up_vote = 0
  }
  if (video.down_vote < 0){
    video.down_vote = 0
  } 
  next()
})


videoSchema.methods.updateVote = async function (newVote, preVote) {
  const video = this;
  let up_vote = 0;
  let down_vote = 0;  
  
  if (preVote !== undefined && newVote.vote !== preVote?.vote) {
    preVote.vote === false ? down_vote-- : up_vote--;
  }
  newVote.vote === true ? up_vote++ : down_vote++;  
  video.up_vote = video.up_vote + up_vote;
  video.down_vote = video.down_vote + down_vote;
  await video.save();
}

videoSchema.statics.getVideos = async (req) => {
  try { 
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;
    return await Video.paginate({}, { offset, limit, populate: { path: 'shared_by', select: 'email' }, sort: "-createdAt"  })    
  } catch (error) {
    console.log(error);
    throw new Error('Cannot get videos');
  }    
}

const Video = mongoose.model('Video', videoSchema)

module.exports = Video