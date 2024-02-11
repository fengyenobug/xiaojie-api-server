import express from 'express'
import cors from 'cors'
import logger from 'morgan'
const app = express()
// 导入 dotenv 以注入环境变量
import dotenv from 'dotenv'
dotenv.config()
app.use(cors())
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

import apiRouter from './router/apiRouter.js'
import userRouter from './router/user.js'
app.use(apiRouter)
app.use('/api', userRouter)

app.listen(3000, () => {
    console.log('express server running at 127.0.0.1:3000');
})