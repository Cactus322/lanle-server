import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import config from './utils/config'
import logger from './utils/logger'
import userRouter from './controllers/users'
import loginRouter from './controllers/login'
import bookRouter from './controllers/books'
import middleware from './utils/middleware'
import translateRouter from './controllers/translate'
import dictionaryRouter from './controllers/dictionary'

const app = express()

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB: ', error.message)
	})

app.use(cors())
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/books', middleware.tokenExtractor, bookRouter)
app.use('/api/translate', translateRouter)
app.use('/api/dictionary',  middleware.tokenExtractor, dictionaryRouter)

export default app