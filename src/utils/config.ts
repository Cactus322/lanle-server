import { IUtilsConfig } from "./types"
import dotenv from 'dotenv'

dotenv.config()
// require('dotenv').config()

const PORT = process.env.PORT as string
const MONGODB_URI = process.env.MONGODB_URI as string


const config: IUtilsConfig = {
    PORT,
    MONGODB_URI
}

export default config