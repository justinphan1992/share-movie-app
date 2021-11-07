const axios = require('axios');

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
    console.log('Start fetching youtube video');
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.GOOGLE_API_KEY}`);
    console.log('Fetching success youtube video', response.status);
    console.log('Youtube data', response.data);
    const data = response.data;
    if (!data.items || data.items.length === 0) {
      console.log("Empty Video Items");
      return false
    } 
    
    return {
      title: data.items[0].snippet.title,
      description: data.items[0].snippet.description,
    }
  } catch (error) {
    console.log(error);
    return false
  }  
}

module.exports = {
  getVideoId,
  getVideoSnipet
}