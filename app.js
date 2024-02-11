import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import { expressjwt } from 'express-jwt'
const app = express()
// 导入 dotenv 以注入环境变量
import dotenv from 'dotenv'
dotenv.config()
app.use(cors())
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }))
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上

app.use(expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

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