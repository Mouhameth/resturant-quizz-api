const { text } = require('body-parser')
const mongoose = require('mongoose')
const { type } = require('os')

const quizzSchema = mongoose.Schema({
    question:{
        type:String,
        required:[true,'enter the name']
    },
    reponses:[
        
        {
           reponse:String,
           genre: String
        }
    ]
},{timetamps:true})

module.exports = mongoose.model('Quizz',quizzSchema)