const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db');
const routes = require('./routes/route')
require('dotenv').config();

const server = express();

const port = process.env.PORT

connectDB();

server.use(cors())
server.use(express.json());
server.use(express.urlencoded({extended: true}))

server.use('/',routes)

server.listen(port, () => {
  console.log(`server running on the port ${port}`)
})