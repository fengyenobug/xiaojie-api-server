import express from 'express'
import cors from 'cors'
const app = express()

import apiRouter from './router/apiRouter.js'
app.use(cors())
app.use(apiRouter)

app.listen(80, () => {
    console.log('express server running at 127.0.0.1');
})