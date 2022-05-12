const express = require('express');
// const bodyParser = require('body-parser');
const morgan = require('morgan')
const helmet = require('helmet')
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const {authRoute} = require('./src/routes')

dotenv.config()
const app = express()
const port = process.env.PORT || 5000
const mongo = process.env.MONGO

// app.use(bodyParser())
app.use(express.json())
// app.use(morgan('tiny'))

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, Accept');
    next()
})

app.use(morgan('common'))
app.use(helmet())

app.use('/api/auth',authRoute)

app.use('/',async(req,res)=>{
   await res.send('connected to base endpoint')
})

mongoose.connect(mongo).then(()=>{
    app.listen(port, ()=> {
        console.log(`listening on server:${port}`)
    })
}).catch(e=>console.log(e))