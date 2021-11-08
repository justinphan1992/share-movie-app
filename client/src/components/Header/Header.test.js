import { screen } from '@testing-library/react'
import { render } from '../../tests/render';
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import userEvent from '@testing-library/user-event'
import Header from './Header';

const mockLoginResponseSuccess = {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTg4MDY2ZTI1ZmU4MmI3ZDAwYzFkNjciLCJpYXQiOjE2MzYzNDg1NzJ9.uQlH-StK2WBfBpxIlXYEYryNM9sHgTCdwoqQokH9LN4"
}

const mockUserResponse = {
  "_id": "6188066e25fe82b7d00c1d67",
  "email": "test@test.com",
  "votes": [
      {
          "video_id": "61873b6e9e9ec581172aa3b4",
          "vote": true,
          "_id": "618887cc2f74809b01992b80"
      },
    
  ]
}

const server = setupServer(
  rest.post('/login', (req, res, ctx) => {
    return res(ctx.json(mockLoginResponseSuccess))
  }),  
  rest.get('/me', (req, res, ctx) => {
    return res(ctx.json(mockUserResponse))
  }),  
  rest.post('/logout', (req, res, ctx) => {
    return res(ctx.json({}))
  }),  
)


describe('Header Component', () => {
  beforeEach(() => {
    render(<Header />)
  })

  beforeAll(() => server.listen())
  afterEach(() => {
    localStorage.clear();
    server.resetHandlers()
  })
  afterAll(() => server.close())

  it('should render header with login form when unauthenticaion', () => {
    expect(screen.getByText('Funny Movies')).toBeInTheDocument()
    expect(screen.getByTestId('site-logo')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()    
    expect(screen.getByText('Login / Register')).toBeInTheDocument()
  }) 

  it('should able submit login form', async() => {
    userEvent.type(screen.getByLabelText('Email', { selector: 'input' }), 'valid@zenrooms.com')
    userEvent.type(screen.getByLabelText('Password', { selector: 'input' }), 'password')
    userEvent.click(screen.getByText('Login / Register'))
    expect(await screen.findByText('Welcome test@test.com')).toBeInTheDocument()
    expect(screen.getByText('Share a Movie')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('should able to see login form when logout', async() => {
    userEvent.type(screen.getByLabelText('Email', { selector: 'input' }), 'valid@zenrooms.com')
    userEvent.type(screen.getByLabelText('Password', { selector: 'input' }), 'password')
    userEvent.click(screen.getByText('Login / Register'))
    expect(await screen.findByText('Welcome test@test.com')).toBeInTheDocument()
    userEvent.click(screen.getByText('Logout'))
    expect(await screen.findByText('Login / Register')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()    
  })
})