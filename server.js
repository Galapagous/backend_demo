const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const AuthRoute = require('./routes/auth')
const UserRoute = require('./routes/user')

//--------------------configurations--------------------
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
dotenv.config()

//--------------------connecting to database--------------------
const connect =async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to DB')
        const port = process.env.PORT || 6000
        app.listen(process.env.PORT, ()=>{
            console.log(`server listening on port ${port}`)
        })
    } catch (error) {
        console.error({err: error})
    }
}
connect()


//--------------------routes setup--------------------
app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)