const { app, server, io, express } = require('./sockets/socket')
const config = require('config')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Message = require('./models/Message')
const User = require('./models/User')
const cors = require('cors')
const usersOnline = require('./storage/usersOnline')
const { merge } = require('./routes/auth.routes')

app.use(express.json())

app.use('/api/auth', require('./routes/auth.routes'))



const start = async () => {

    /*io.use((packet, next) => {
        console.log('packet.handshake.query.token', packet.handshake.query.token)
        const token = packet.handshake.query.token
        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'))
            return next()
        }
        catch (error) {
            next(new Error('not Auth'))
        }
    })*/

    io.on('connection', async socket => {
        console.log(`New client connected ${socket.id}`)

        socket.on('load history and users', async (token) => {
            if (token) {
                try {
                    const decoded = jwt.verify(token, config.get('jwtSecret'))

                    usersOnline.set(socket.id, decoded.userId)

                    const history = await Message.find()

                    const hst = history.map(el => {
                        const { message, userId, dateTime, senderName } = el
                        return { message, userId, dateTime, senderName }
                    })

                    const users = await User.find()

                    const us = users.map(el => {
                        const { nickname, id } = el
                        return { nickname, id }
                    })

                    const arr = Array.from(usersOnline.entries())
                    io.emit('load history', { hst, us })
                    io.emit('users online', arr)
                } catch (error) {
                    console.log('not auth catch load history and users')
                    io.emit('not auth')
                }
            }
            else {
                console.log('not auth else load history and users')
                io.emit('not auth')
            }
        })

        socket.on('new message', async data => {
            const { token, message } = data

            if (token) {
                if (message) {
                    try {
                        const decoded = jwt.verify(token, config.get('jwtSecret'))

                        const msg = new Message({
                            message: message,
                            userId: decoded.userId,
                            dateTime: new Date(),
                            senderName: decoded.nickname
                        })

                        const savedMsg = await msg.save()

                        io.emit('add message', savedMsg)
                    } catch (error) {
                        console.log('not auth catch new message ', error)
                        io.emit('not auth')
                    }
                }
            }
            else {
                console.log('not auth else new message')
                io.emit('not auth')
            }
        })

        socket.on('user logout', token => {

            if (token) {

                try {
                    const decoded = jwt.verify(token, config.get('jwtSecret'))

                    usersOnline.delete(socket.id)
                    const arr = Array.from(usersOnline.entries())
                    io.emit('users online', arr)
                } catch (error) {
                    console.log('not auth catch user logout')
                    io.emit('not auth')
                }
            }
            else {
                console.log('not auth else new user logout')
                io.emit('not auth')
            }
        })

        socket.on('disconnect', () => {

            usersOnline.delete(socket.id)
            const arr = Array.from(usersOnline.entries())
            io.emit('users online', arr)

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