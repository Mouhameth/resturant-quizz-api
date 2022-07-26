const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'enter the name']
    },
    email: {
        type: String,
        required: [true, 'enter the email']
    },
    password: {
        type: String,
        required: [true, 'enter the password']
    },
    role: {
        type: String,
        required: [true, 'enter the role']
    },
    note: {
        type: Number
    },
    quizz: [{
        question: String,
        reponses: [{
            reponse:String
        }]
    }]
}, { timetamps: true })

module.exports = mongoose.model('User', userSchema)