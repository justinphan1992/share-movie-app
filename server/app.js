const express = require('express')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const port = process.env.PORT
require('./db/db')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(authRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})