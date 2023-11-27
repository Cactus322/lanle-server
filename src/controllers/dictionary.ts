import express from 'express'
import middleware from '../utils/middleware'
import Dictionary from '../models/dictionary'

const dictionaryRouter = express.Router()

dictionaryRouter.get('/', middleware.userExtractor, async (_request: any, response: any) => {
		const dictionary = await Dictionary.find({})
			.populate('user', { username: 1, name: 1 })

		response.json(dictionary)
	}
)

dictionaryRouter.post('/', middleware.userExtractor, async (request: any, response: any) => {
		const { text } = request.body
		const user = request.user
		
		if (!text.wordEn || !text.wordRu) {
			return response.status(400).json({
				error: 'Content missing',
			})
		}

		const dictionary = new Dictionary({
			wordEn: text.wordEn,
			wordRu: text.wordRu
		})

		console.log(dictionary);

		const savedDictionary = await dictionary.save()
		console.log(savedDictionary);
		user.dictionary = user.dictionary.concat(savedDictionary._id)
		await user.save()

		return response.status(201).json(savedDictionary)
	}
)

export default dictionaryRouter