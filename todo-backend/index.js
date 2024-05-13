require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./DB/connection')

const todoServer = express()
todoServer.use(cors())
todoServer.use(express.json())
todoServer.use(router)

const PORT = 4000 || process.env.PORT

todoServer.listen(PORT, () => {
    console.log(`Todo server started at PORT ${PORT}`);
})