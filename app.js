import dotenv from 'dotenv'
import express from 'express'
import apiRouter from './routes/api.js'
import connection from './connection.js'

const env = dotenv.config().parsed

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', apiRouter)

// catch 404 and forward to error handler
app.use((req, res) => {
    res.status(404).json({ message: '404_NOT_FOUND' })
})

// MongoDb Connection
connection()

app.listen(env.APP_PORT, () => {
    console.log(`Server is running on port ${env.APP_PORT}`)
})