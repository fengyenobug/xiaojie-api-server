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
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
app.use(expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ['HS256'] }).unless({ path: ["/login", /^\/api\//, "/reguser"] }))
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.cc = (err, status = 500) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

app.use((err, req, res, next) => {
    // 这次错误是由 token 解析失败导致的
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 401,
            message: '无效的token',
        })
    }
    res.send({
        status: 500,
        message: '未知的错误',
    })
})

import apiRouter from './router/apiRouter.js'
import whiteListRouter from './router/whiteList.js'
import userRouter from './router/user.js'
app.use("/api", apiRouter)
app.use(whiteListRouter)
app.use(userRouter)

app.listen(3000, () => {
    console.log('express server running at 127.0.0.1:3000');
})