import express, { Request, Response } from 'express'
import { ITranslateRequest } from '../types'
import { translate } from '@vitalets/google-translate-api'
import { HttpProxyAgent } from 'http-proxy-agent'

const translateRouter = express.Router()

translateRouter.post(
	'/',
	async (request: Request<{}, {}, ITranslateRequest>, response: Response) => {
		const { word } = request.body
		const timeoutMs = 5000
		const ac = new AbortController()
		const timer = setTimeout(() => ac.abort(), timeoutMs)

		const fetchOptions = {
			agent: new HttpProxyAgent('http://213.233.177.134:80'),
			signal: ac.signal,
		}

		try {
			const { text } = await translate(word, { to: 'ru', fetchOptions })
			return response.status(201).json(text)
		} finally {
			clearTimeout(timer)
		}
	}
)

export default translateRouter
