import { screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react'
import { render } from '../tests/render';
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import userEvent from '@testing-library/user-event'
import ShareVideo from './ShareVideo';


const addVideoResponse = {
  "youtube_id": "U81P1eWqAuA",
  "title": "[Sách Nói] Lối Sống Khắc Kỉ - Hành Trình Từ Hoang Mạc Khô Cằn Đến Khu Vườn Hạnh Phúc | Chương 1",
  "description": "Nghe trọn sách nói Lối Sống Khắc Kỉ - Hành Trình Từ Hoang Mạc Khô Cằn Đến Khu Vườn Hạnh Phúc trên ứng dụng Fonos:  https://fonos.app.link/youtube\nBạn có thể nhận được 3 cuốn sách khi chia sẻ sách thành công với những người bạn mới chỉ với 2 bước đơn giản. Chọn mục \"Quà tặng\" trong ứng dụng Fonos để tham gia nhé: https://fonos.app.link/qua-tang\n\n---\n\nVề Fonos: \nFonos là ứng dụng sách nói có bản quyền. Trên ứng dụng Fonos, bạn có thể nghe định dạng sách nói những cuốn sách nổi tiếng nhất của các tác giả trong nước và quốc tế. Ngoài ra, bạn được sử dụng miễn phí những nội dung độc quyền khi đăng ký trở thành Hội viên của Fonos: Truyện ngủ, Nhạc thư giãn, Thiền định, Tóm tắt sách, Audio Series\n\n---\n\nLối Sống Khắc Kỉ – Hành Trình Từ Hoang Mạc Khô Cằn Đến Khu Vườn Hạnh Phúc như một lời cổ vũ cho sự tự vươn lên của mỗi người giữa cuộc sống nhiều bộn bề. Những tư tưởng của triết học khắc kỷ cũng được đề cập sâu sắc trong cuốn sách, giúp bạn hiểu hơn về một lối sống, lối tư duy tích cực đã được đúc kết từ cách đây rất lâu.\n\nLối sống khắc kỉ nghe có vẻ cao siêu nhưng bản chất lại là những bài học giản dị, có thể vận dụng vào đời sống hàng ngày. Để đạt được thành công và sống vui vẻ, lối sống khắc kỷ là điều cần thiết vì nó giúp ta rèn luyện sự mạnh mẽ, lý trí để đương đầu với mọi khó khăn bằng một tâm thế bình thản. Bởi triết lý khắc kỷ nhìn nhận cách sống của con người ở một góc độ khác biệt. Ví dụ như khi nói về hành trình của một con tàu, ai cũng nghĩ rằng chiếc tàu ấy phải căng buồm trên biển khơi lộng gió và tiến về phía trước nhưng triết học khắc kỷ nhìn nhận theo chiều hướng khác, là nếu chẳng may tàu bị chìm xuống biển sâu thì một hành trình khác biệt lại bắt đầu, mới mẻ và đầy bí ẩn. \n\nXét cho cùng, những khó khăn, tổn thương là cách để trưởng thành, con người muốn cứng mạnh cũng phải vượt lên nghịch cảnh. Mỗi cảnh huống trong đời đều là một tấm vải vẽ còn trống, một khối cẩm thạch thô nguyên để bạn luyện tập tay nghề và hoàn thiện kỹ năng. Bằng lối sống khắc kỷ, bạn sẽ có hành trang để trở thành một chiến binh, sẵn sàng đối mặt với mọi thử thách của cuộc đời.\n\nSách nói Lối Sống Khắc Kỉ - Hành Trình Từ Hoang Mạc Khô Cằn Đến Khu Vườn Hạnh Phúc trên ứng dụng Fonos được diễn đọc bởi những diễn viên lồng tiếng chuyên nghiệp và được thu âm tại phòng thu để đảm bảo chất lượng cao nhất. \n\n---\n\nTìm hiểu về Fonos: https://fonos.vn/\nTheo dõi Facebook Fonos: https://www.facebook.com/fonosvietnam/\nTheo dõi Instagram Fonos: https://www.instagram.com/fonosvietnam/\nĐọc những bài viết thú vị về sách, các tác giả sách, những thông tin hữu ích để phát triển bản thân: http://blog.fonos.vn/\n\n---\n\nNếu bạn yêu thích sách nói Lối Sống Khắc Kỉ - Hành Trình Từ Hoang Mạc Khô Cằn Đến Khu Vườn Hạnh Phúc, hãy like, share và để lại bình luận cho Fonos biết nhé! Đừng quên đăng ký kênh để nghe miễn phí chương đầu mọi sách nói trên Fonos và tải ứng dụng trên Google Play/App Store để nghe các chương tiếp theo.\n\n#fonos #sáchnói #LốiSốngKhắcKỉ #JonasSalzgeber",
  "up_vote": 0,
  "down_vote": 0,
  "shared_by": "6188066e25fe82b7d00c1d67",
  "_id": "6188e3277a6fb107dcfba1b8",
  "createdAt": "2021-11-08T08:43:19.361Z",
  "updatedAt": "2021-11-08T08:43:19.361Z",
  "__v": 0
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
  rest.get('/me', (req, res, ctx) => {
    return res(ctx.json(mockUserResponse))
  }),    
  rest.post('/video', (req, res, ctx) => {
    return res(ctx.json(addVideoResponse))
  }), 
)


describe('Share Video Page', () => {
  let history;
  beforeEach(() => {
    localStorage.setItem('token', 'testtoken');
    ({ history } = render(<ShareVideo />, { route: '/share-video'}))
  })

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => {
    server.close()
    localStorage.clear()
  })

  it('should render share video page correctly', async () => {
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByText('Share a Youtube movive')).toBeInTheDocument()    
    expect(screen.getByLabelText('Youtube Link')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()    
  })       
})