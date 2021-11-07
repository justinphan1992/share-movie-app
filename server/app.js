const express = require('express')
const authRouter = require('./routes/auth')
const videoRouter = require('./routes/video')

const port = process.env.PORT
require('./db/db')

const app = express()

app.use(express.json())
app.use(authRouter)
app.use(videoRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})