const express = require('express')
const cors = require('cors')
const authRouter = require('./routes/auth')
const videoRouter = require('./routes/video')

const port = process.env.PORT || 80
require('./db/db')

const app = express()

app.use(cors())
app.use(express.json())
app.use(authRouter)
app.use(videoRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

module.exports = app;