import express from "express"
import * as user_handler from "../router_handler/user.js"
// 创建路由对象
const router = express.Router()
// 注册新用户
router.post('/reguser',user_handler.regUser)
// 登录
router.post('/login', user_handler.login)

export default router
