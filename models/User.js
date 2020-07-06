const { Schema, model } = require('mongoose')

const schema = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    nickname: {type: String, required: true, unique: true}
})

module.exports = model('User', schema)