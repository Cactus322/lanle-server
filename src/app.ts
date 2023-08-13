import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import config from './utils/config'
import logger from './utils/logger'

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

export default app