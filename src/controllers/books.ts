import express, { Response } from 'express'
import Book from '../models/book'
import middleware from '../utils/middleware'
import { IUserRequest } from '../types'

const bookRouter = express.Router()


bookRouter.get('/', middleware.userExtractor, async (_request: IUserRequest, response: any) => {
	const books = await Book.find({})
		.populate('user', { username: 1, name: 1 })

	response.json(books)
})

bookRouter.post('/', middleware.userExtractor, async (request: IUserRequest, response: any) => {

	const { bookUrl } = request.body
    const user = request.user

    if (!bookUrl) {
		return response.status(400).json({
			error: 'Content missing',
		})
	} else if (user.books.length === 10) {
        return response.status(405).json({
			error: 'Maximum number of books',
		})
    }

    const book = new Book({
        bookUrl,
    })

	const savedBook = await book.save()
    user.books = user.books.concat(savedBook._id)
	await user.save()

    return response.status(201).json(savedBook)
})

export default bookRouter