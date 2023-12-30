import express from 'express'
import middleware from '../utils/middleware'
import Dictionary from '../models/dictionary'
import {
	IDictionaryRequest,
	IDictionaryText,
	IUser,
	TypedResponse,
} from './controllers.types'

const dictionaryRouter = express.Router()

dictionaryRouter.get(
	'/',
	middleware.userExtractor,
	async (_request: Express.Request, response: TypedResponse) => {
		const dictionary = await Dictionary.find({}).populate('user', {
			username: 1,
			name: 1,
		})

		response.json(dictionary)
	}
)

dictionaryRouter.post(
	'/',
	middleware.userExtractor,
	async (
		request: IDictionaryRequest<{ wordEn: string, wordRu: string }, IUser>,
		response: any
	) => {
		const { wordEn, wordRu } = request.body
		const user = request.user

		if (!wordEn || !wordRu) {
			return response.status(400).json({
				error: 'Content missing',
			})
		}


		const dictionary = new Dictionary({
			wordEn: wordEn,
			wordRu: wordRu,
		})

		const savedDictionary = await dictionary.save()
		user.dictionary = user.dictionary.concat(savedDictionary._id)
		await user.save()

		return response.status(201).json(savedDictionary)
	}
)

export default dictionaryRouter
