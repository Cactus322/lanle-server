// import { translate } from '@vitalets/google-translate-api';


// const hoba = async () => {
//     const { text } = await translate('Привет, мир! Как дела?', { to: 'en' });
//     console.log(text) 
// }

// hoba()

import app from "./app"
import http from 'http'
import logger from "./utils/logger"
import config from "./utils/config"

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})