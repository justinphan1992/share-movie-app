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
})

videoSchema.plugin(mongoosePaginate);

videoSchema.methods.voteVideo = async function (vote) {
  const video = this;
  if (vote) {
    video.up_vote = video.up_vote++;
  } else {
    video.down_vote = video.down_vote++;
  }
  await video.save();
}

videoSchema.statics.getVideos = async (req) => {
  try { 
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;
    return await Video.paginate({}, { offset, limit })    
  } catch (error) {
    console.log(error);
    throw new Error('Cannot get videos');
  }    
}

const Video = mongoose.model('Video', videoSchema)

module.exports = Video