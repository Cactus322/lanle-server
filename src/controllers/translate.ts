import express, { Request, Response } from 'express'
import { ITranslateRequest } from '../types'
import { translate } from '@vitalets/google-translate-api'

const translateRouter = express.Router()

translateRouter.post(
	'/',
	async (request: Request<{}, {}, ITranslateRequest>, response: Response) => {
		const { word } = request.body

		const { text } = await translate(word, { to: 'en' })

		return response.status(201).json(text)
	}
)

export default translateRouter
