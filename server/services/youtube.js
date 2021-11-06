
const fetch = require('node-fetch');

const getVideoId = (youtubeLink) => {
  if (!youtubeLink) {
    throw Error('Invalid youtube link');    
  }
  
  let videoId = '';
  const url = new URL(youtubeLink);

  if (url.origin.includes('youtube.com')) {    
    videoId = url.searchParams.get('v')    
  }

  if (url.origin.includes('youtu.be')) {
    videoId = url.pathname.replace('/', "");    
  }

  return videoId;
}

const getVideoSnipet = async (videoId) => {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.GOOGLE_API_KEY}`)

    if (!response.items || response.items.length === 0) {
      throw Error("Cannot find video");
    } 

    return {
      title: response.items[0].title,
      description: response.items[0].description,
    }
  } catch (error) {

  }
  
}