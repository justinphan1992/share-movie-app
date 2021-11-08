import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { render } from '../tests/render';
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import userEvent from '@testing-library/user-event'
import Home from './Home';


const mockVideoResponse = {
  "docs": [
    {
        "_id": "618895f8fc052908fbe4d65b",
        "youtube_id": "ASlTFtCjkU8",
        "title": "Infinite Scroll And Filters With React Query",
        "description": "In this video I'm going to show you how I implemented Infinite Scroll and filters on my new website.\n\nSo I’m currently working on a new site for Watch and Learn, the first MVP is already done and should be live soon, once I decide what I will use for hosting the frontend of the site. The stack that I’m using for the site is October CMS for the backend.\n\nAnd of course the frontend is Next.js with TypeScript and Tailwind CSS that uses Just in Time compilation. Which turned out to be a really nice way of building the frontend. \n\nThe reason I’m using October CMS for the backend is that my site has been running on October for a few years now and all my videos and data are there, and I don’t wanna waste time with transfering all of that data to another CMS because October is doing the job it needs to just fine.\n\nAlso since October is made with Laravel it makes it pretty easy to create your own APIs that you can connect to with something like Next.js, Vue, React and so on. \n\nSo I was thinking about how to make pagination for “all videos” page, Currently it’s a classical pagination that you need to click on to get to the next set of items.\n\nIn my opinion this is not a very good pattern because normal pagination gives you redundant info, what I mean by that, is that the pages of a list don’t actually mean anything to the user, the user won’t know what to expect on the 2nd page, and what to expect on the 10th page.\n\nSo it’s better to just serve a list that the user can scroll through without any required interaction to see the next items in the list.\n\nThis is a familiar pattern that you can see on many apps and platforms like Facebook, Instagram, Youtube and so on.\n\nAnd if you include #filters with infinite scrolling this makes a very nice combo. Because when the user actually filters something he or she will have a general idea of what to expect in terms of content that will be returned.\n\nSo for my site I decided to go with Infinte Scroll because of the reasons mentioned earlier. \n\nNow [I already showed you how to make infinite scrolling with Infinite Scroll Component](https://watch-learn.com/making-websites-nextjs-and-strapi/infinite-scroll) in the previous video, but that component will make it hard for us to include filters to our list of items, because it is primarily made to do only infinite scrolling.\n\nSo on my site I decided to go with #React #Query which enables me to have Infinte Scrolling, Filtering and also everything else that React Query offers in terms of data fetching - like caching, content invalidation and so on.\n\nIn this video I’m going to show you how I did this.\n\nScroll Icon by https://www.freepik.com from https://www.flaticon.com/\n\n### Code used in this video\n\nhttps://bit.ly/34wPQie\n\n----------------------------------------------------------------------------------------------\n⭐ Kite is a free AI-powered coding assistant that will help you code faster and smarter. The Kite plugin integrates with all the top editors and IDEs to give you smart completions and documentation while you’re typing. You can check it out here:  http://bit.ly/3qdjIc5​​​​​\n------------------------------------------------------------------------------------------------\n\n### You can support my work on Patreon \n\nhttps://patreon.com/watchlearn\n\n### Follow me on Social Media\n\nGithub:  https://github.com/ivandoric\nTwitter:  https://twitter.com/ivan_doric\nInstagram:  https://www.instagram.com/watchlearntuts\nFacebook:  https://facebook.com/watchlearntutorials",
        "up_vote": 0,
        "down_vote": 1,
        "shared_by": {
            "_id": "6188066e25fe82b7d00c1d67",
            "email": "test@test.com"
        },
        "createdAt": "2021-11-08T03:14:00.517Z",
        "updatedAt": "2021-11-08T03:23:43.807Z",
        "__v": 0
    }
  ],
  "totalDocs": 2,
  "offset": 0,
  "limit": 1,
  "totalPages": 2,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": null
}

const mockVideoResponse2 = {
  "docs": [
      {
          "_id": "6188b7b6271f3ecb69115dd6",
          "youtube_id": "p6X_5rkkA-I",
          "title": "Learn English with Friends | The Friendly Finger",
          "description": "Learn English with this classic and hilarious Friends clip, where we learn how Ross likes to insult people with \"the Friendly Finger\". This is a great way for you to learn about American culture and insults while increasing your vocabulary and improving your pronunciation. \n\nUnderstand Fast-Speaking Natives! ✅\n𝗚𝗲𝘁 𝗼𝘂𝗿 𝗙𝗥𝗘𝗘 𝗠𝗔𝗦𝗧𝗘𝗥𝗖𝗟𝗔𝗦𝗦 👇 𝗛𝗲𝗿𝗲\nhttps://reallifeglobal.com/lewtv-friendly-finger-lp/\n\n\nSubscribe to our channel to get new lessons every week: https://goo.gl/HUZkdH \r\n\r\nWatch more lessons and Learn RealLife English with TV Lessons: https://goo.gl/kGeihU\r\n\r\nGet 10 Free PDF Power Lessons for our videos: https://reallifeglobal.com/lewtv-compilation/\r\n\r\nSpeak English NOW! Download our FREE App - https://reallifeglobal.com/lewtv-app/\n\r\nLike us on Facebook: https://www.facebook.com/getreallifeenglish\r\n\r\n👇👇👇\r\n\r\nHelp us translate our videos, so more learners from your country can enjoy them, too! http://www.youtube.com/timedtext_cs_panel?tab=2&c=UCKgpamMlm872zkGDcBJHYDg\n\n#LearnEnglishWithFriends  #TheFriendlyFinger #LearnEnglishWithTVSeries",
          "up_vote": 1,
          "down_vote": 0,
          "shared_by": {
              "_id": "6188066e25fe82b7d00c1d67",
              "email": "test2@test.com"
          },
          "createdAt": "2021-11-08T05:37:58.031Z",
          "updatedAt": "2021-11-08T05:38:11.064Z",
          "__v": 0
      },      
  ],
  "totalDocs": 2,
  "offset": 1,
  "limit": 1,
  "totalPages": 2,
  "page": 2,
  "pagingCounter": 2,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevPage": null,
  "nextPage": null
}

const mockUserResponse = {
  "_id": "6188066e25fe82b7d00c1d67",
  "email": "test@test.com",
  "votes": [
      {
          "video_id": "618895f8fc052908fbe4d65b",
          "vote": true,
          "_id": "618887cc2f74809b01992b80"
      },
    
  ]
}


const server = setupServer(  
  rest.get('/video', (req, res, ctx) => {
    return res(ctx.json(mockVideoResponse))
  }),  
  rest.get('/me', (req, res, ctx) => {
    return res(ctx.json(mockUserResponse))
  }),  
  rest.post('/logout', (req, res, ctx) => {
    return res(ctx.json({}))
  }),  
)


describe('Home Page', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'testtoken');
    render(<Home />)
  })

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => {
    server.close()
    localStorage.clear()
  })

  it('should render home page correctly', async () => {
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByText('Infinite Scroll And Filters With React Query')).toBeInTheDocument()
    expect(screen.getByText('Shared by: test@test.com')).toBeInTheDocument()
    expect(screen.getByLabelText('up-vote')).toBeInTheDocument()
    expect(screen.getByLabelText('up-vote').getAttribute('aria-checked')).toBe("true")
    expect(screen.getByLabelText('down-vote')).toBeInTheDocument()
    expect(screen.getByLabelText('down-vote').getAttribute('aria-checked')).toBe("false")
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByLabelText('video-item')).toBeInTheDocument()
    expect(screen.getByText('Load more')).toBeInTheDocument()    
  }) 
  
  it('should able to load more item when click load more', async () => {
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByText('Load more')).toBeInTheDocument()  
    server.use(
      rest.get('/video', (req, res, ctx) => {
        return res(ctx.json(mockVideoResponse2))
      }),  
    )
    userEvent.click(screen.getByText('Load more'));
    expect(await screen.findByText('Learn English with Friends | The Friendly Finger')).toBeInTheDocument()  
    expect(screen.getByText('Shared by: test2@test.com')).toBeInTheDocument()
  })  
})