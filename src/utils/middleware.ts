import jwt from 'jsonwebtoken'
import User from '../models/user'
import { IUserRequest } from '../types'

const tokenExtractor =async (request: IUserRequest, _response: any, next: any) => {
    const authorization = await request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        request.token = authorization.substring(7)
    } else {
        request.token = ''
    }

    next()
}

const userExtractor = async (request: IUserRequest, response: any, next: any) => {
    try {
        const decodedToken: any = jwt.verify(request.token, process.env.SECRET as string)
        request.user = await User.findById(decodedToken.id)
    } catch {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    next()
}

const middleware = {
    userExtractor,
    tokenExtractor
}

export default middleware
