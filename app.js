const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const config = require('config')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Message = require('./models/Message')
const User = require('./models/User')
const cors = require('cors')

const app = express()

const server = http.createServer(app)
const io = socketIO(server)

io.origins('*:*')



app.use(express.json())

app.use('/api/auth', require('./routes/auth.routes'))



const start = async () => {
    io.on('connection', async socket => {
        console.log(`New client connected ${socket.id}`)


        socket.on('load history and users', async () => {
            const history = await Message.find()

            const hst = history.map(el => {
                const { message, userId, dateTime, senderName } = el
                return { message, userId, dateTime, senderName }
            })

            const users = await User.find()

            const us = users.map(el => {
                const { nickname } = el
                return { nickname }
            })

            socket.emit('load history', { hst, us })
        })

        socket.on('new message', async data => {
            const { token, message } = data



            if (!token) {
                io.emit('not auth')
            }

            if (token) {
                const decoded = jwt.verify(token, config.get('jwtSecret'))

                if (decoded.exp < Date.now() / 1000) {
                    io.emit('not auth')
                }

                const msg = new Message({
                    message: message,
                    userId: decoded.userId,
                    dateTime: new Date(),
                    senderName: decoded.nickname
                })

                const savedMsg = await msg.save()

                io.emit('add message', savedMsg)
            }
        })

        socket.on('disconnect', () => {
            tempSocket = socket.id
            console.log(`user disconnected ${socket.id}`)
        })

    })
    await mongoose.connect(config.get('mongoUri'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })

    const port = config.get('port')

    server.listen(port, () => console.log(`Listening on port ${port}`))
}

start()