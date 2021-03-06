const { Router } = require('express')
const { io } = require('../sockets/socket')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const usersOnline = require('../storage/usersOnline')




const router = Router()

router.post(
    '/register',
    async (req, res) => {
        const { login, password } = req.body
        if (login && password) {
            const candidate = await User.findOne({ login })
            if (candidate) {
                return res.json({ message: 'Пользователь существует' })
            }

            const user = new User({ login, password, nickname: login })

            await user.save()

            console.log('Пользователь создан')

            return res.json({ message: 'Пользователь создан' })
        }
        return res.send()

    }
)

router.post(
    '/login',
    async (req, res) => {
        const { login, password } = req.body
        if (login && password) {
            const user = await User.findOne({ login })
            if (!user) {
                return res.json({ message: 'Пользователя не существует' })
            }

            if (password !== user.password) {
                return res.json({ message: 'Неверный пароль' })
            }

            const token = jwt.sign(
                { userId: user.id, nickname: user.nickname },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            //usersOnline.set(user.id, user.id)
            //io.emit('users online', Array.from(usersOnline.keys()))

            return res.json({ token, userId: user.id, nickname: user.nickname })
        }
        return res.send()
    }
)

module.exports = router