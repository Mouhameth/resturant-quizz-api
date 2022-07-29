const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 5000
const {errorHandler} = require('./backend/middleware/errorMiddleware')
const connectDB = require('./backend/config/db')
const cors = require('cors')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use('/api/quizz',require('./backend/routes/quizzRoutes'))
app.use('/api/users',require('./backend/routes/userRoutes'))

app.use(errorHandler)

app.listen(port,()=> console.log(`server starts on port ${port}`))