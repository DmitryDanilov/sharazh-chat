const { Router } = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = Router()

router.post(
    '/register',
    async (req, res) => {
        const { login, password } = req.body
        if (login && password) {
            const candidate = await User.findOne({ login })
            if (candidate) {
                res.json({ message: 'Пользователь существует' })
            }

            const user = new User({ login, password, nickname: login })

            await user.save()

            res.json({ message: 'Пользователь создан' })
        }
        res.send()

    }
)

router.post(
    '/login',
    async (req, res) => {
        const { login, password } = req.body
        if (login && password) {
            const user = await User.findOne({ login })
            if (!user) {
                res.json({ message: 'Пользователя не существует' })
            }

            if (password !== user.password) {
                res.json({ message: 'Неверный пароль' })
            }

            const token = jwt.sign(
                { userId: user.id, nickname: user.nickname },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id, nickname: user.nickname })
        }
        res.send()
    }
)

module.exports = router