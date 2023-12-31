import { Request } from "express"

export interface IUserRequest extends Request {
    get: any
    token: string,
    user: any
}

export interface ITranslateRequest {
    word: string
}