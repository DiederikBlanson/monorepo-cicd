import express from 'express'
import api from './api/routes'
import dotenv from 'dotenv'
import cors from 'cors' 
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

// Configure express application
const app = express()
const port = process.env.PORT || 1234
dotenv.config()

// Support parsing of application/json type post data!
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// cors
app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))
console.log(`The environment is: ${process.env.NODE_ENV}`)

// connect to api
app.use('/api', api)

// health check
app.get('/health-check', (req, res, next) => res.status(200).send('The server is up and running :)'))

// the 404 route
app.get('*', (req, res) => res.status(404).send('404. This endpoint does not exist :)'))

app.listen(port, () => console.log(`Running on port ${port}`))