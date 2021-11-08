const express = require('express')
const { Video, User } = require('../models')
const { getVideoId, getVideoSnipet } = require('../services/youtube')
const auth = require('../middleware/auth')

const router = express.Router();

router.get('/video', async (req, res) => {
  try {    
    const videos = await Video.getVideos(req);
    return res.status(200).send(videos);
  } catch (error) {
    return res.status(500).send(error);
  }
})

router.post('/video', auth, async (req, res) => {
  try {
    const videoId = getVideoId(req.body.url);

    if (!videoId) {
      return res.status(400).send({ error: 'Invalid Url'});
    }

    if (await Video.exists({ youtube_id: videoId })) {
      return res.status(400).send({ error: 'Video existed'});
    }

    const result = await getVideoSnipet(videoId);
    if (!result) {
      return res.status(400).send({ error: 'Video Not Found'});
    }
    const video = new Video({
      youtube_id: videoId,
      title: result.title,
      description: result.description,
      shared_by: req.user._id.toString(),
    })
    await video.save()    
    return res.status(201).send(video)
  } catch (error) {
    return res.status(400).send(error)
  }
})

router.post('/video/:videoId/rating', auth, async(req, res) => {
  try {
    const vote = req.body.vote || false;
    const user = req.user;        
    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(400).send({ error: 'Video Not Found'})
    }
    await user.addVoteVideo(video, vote)
    const updatedUser = await User.findOne({ _id: user._id })
    const prevVote = user.votes.find(vote => vote.video_id.toString() === video._id.toString())   
    const newVote = updatedUser.votes.find(vote => vote.video_id.toString() === video._id.toString())       
    await video.updateVote(newVote, prevVote);    
    return res.status(200).send({ success: true })
  } catch (error) {    
    return res.status(400).send(error)
  }
})

module.exports = router;
