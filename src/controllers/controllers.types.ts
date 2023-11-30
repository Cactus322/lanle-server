import { Types } from 'mongoose'
import { Send } from "express-serve-static-core";

export interface IDictionaryText {
	wordRu: String,
	wordEn: String,
}

export interface IUser {
	username: String,
	passwordHash: String,
	dictionary: Array<Types.ObjectId>
	save(): void
}

export interface IDictionaryRequest <B, U> extends Express.Request {
	body: B,
	user: U
}

export interface TypedResponse extends Express.Response {
    json: Send,
}

