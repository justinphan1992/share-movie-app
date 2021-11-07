const express = require('express')
const { Video } = require('../models')
const { getVideoId, getVideoSnipet } = require('../services/youtube')
const auth = require('../middleware/auth')

const router = express.Router();

router.get('/video', async (req, res) => {
  try {    
    const videos = await Video.getVideos(req);
    res.status(200).send(videos);
  } catch (error) {
    res.status(500).send(error);
  }
})

router.post('/video', auth, async (req, res) => {
  try {
    const videoId = getVideoId(req.body.url);
    if (!videoId) {
      res.status(400).send({ error: 'Invalid Url'});
    }

    if (await Video.exists({ youtube_id: videoId })) {
      res.status(400).send({ error: 'Video existed'});
    }

    const result = await getVideoSnipet(videoId);
    if (!result) {
      res.status(400).send({ error: 'Video Not Found'});
    }
    const video = new Video({
      youtube_id: videoId,
      title: result.title,
      description: result.description,
      shared_by: req.user._id.toString(),
    })
    await video.save()    
    res.status(201).send(video)
  } catch (error) {
      res.status(400).send(error)
  }
})

router.post('/video/:videoId/rating', auth, async(req, res) => {
  try {
    const vote = req.body.vote || false;
    const user = req.user;    
    console.log("Video Id", req.params.videoId);
    const video = await Video.findById(req.params.videoId);
    console.log(video);
    if (!video) {
      res.status(400).send({ error: 'Video Not Found'})
    }
    await video.voteVideo(vote);
    await user.addVoteVideo(video, vote)
    return res.status(200).send({ success: true })
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
})

module.exports = router;
