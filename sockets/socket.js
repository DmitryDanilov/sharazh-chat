const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()

const server = http.createServer(app)
const io = socketIO(server)

io.origins('*:*')

module.exports = { app, server, io, express }