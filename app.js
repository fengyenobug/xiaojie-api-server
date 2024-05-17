import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import bodyParser from 'body-parser'
import { expressjwt } from 'express-jwt'
import session from 'express-session'
import cookieParser from 'cookie-parser'

import apiRouter from './router/apiRouter.js'
import whiteListRouter from './router/whiteList.js'
import userRouter from './router/user.js'

const app = express()
// 导入 dotenv 以注入环境变量
import dotenv from 'dotenv'
dotenv.config()
app.use(cors(
  {
    credentials: true, // 允许跨域带cookie
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'https://yzre.cn', 'https://www.yzre.cn'],
  }
))
app.use(logger('dev'));

// 图形验证码
app.use(cookieParser());
app.use(session({
  secret: 'xiaojie', // 对session id 相关的cookie进行签名
  resave: true,  //是指每次请求是否都重新设置session cookie
  saveUninitialized: true, // 是否保存未初始化的会话
  cookie: {
    // sameSite: 'none',
    // secure: true,
    httpOnly: false,
    maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
  rolling: true,//是否回滚
  name: "session",//key名，默认为connect.id
}));

// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
app.use(expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ['HS256'] }).unless({ path: ["/login", "/getsvg", /^\/api\//, "/reguser"] }))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.cc = (err, status = 500) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

app.use("/api", apiRouter)
app.use(whiteListRouter)
app.use(userRouter)

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
app.listen(3000, () => {
  console.log('express server running at 127.0.0.1:3000');
})