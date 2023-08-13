import bcrypt from 'bcrypt'
import express from 'express'
import User from '../models/user'

const userRouter = express.Router()

userRouter.get('/', async (_requset, response) => {
	const users = await User.find({})

	response.json(users)
})

userRouter.post('/', async (requset, response) => {
	const { username, passwordHash } = requset.body
	let usernameIsTaken = false

	const usernames = await User.find({})

	usernames.forEach(async (e) => {
		if (e.username === username) {
			usernameIsTaken = true
		}

		if (username.length < 3 || passwordHash.length < 3) {
			return response.status(400).json({
				error: 'content missing',
			})
		} else if (usernameIsTaken) {
			return response.status(400).json({
				error: 'username is taken',
			})
		}

		const saltRounds = 10
		const password = await bcrypt.hash(passwordHash, saltRounds)

		const user = new User({
			username,
			passwordHash: password,
		})

		const savedUser = await user.save()

		return response.status(201).json(savedUser)
	})
})
