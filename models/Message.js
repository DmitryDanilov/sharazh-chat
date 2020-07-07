const { Schema, model } = require('mongoose')

const schema = new Schema({
    message: {type: String, required: true},
    userId: {type: String, required: true},
    dateTime: {type: Date, required: true}
})

module.exports = model('Message', schema)